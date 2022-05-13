package com.smooth038.monopoly.game;

import com.smooth038.monopoly.player.Player;
import com.smooth038.monopoly.player.PlayerRepository;
import com.smooth038.monopoly.propertyregister.PropertyEntry;
import com.smooth038.monopoly.propertyregister.PropertyEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.*;

@Component
public class GameEngine {
	private final GameRepository gameRepository;
	private PropertyEntryService propertyEntryService;
	private PlayerRepository playerRepository;

	@Autowired
	public GameEngine(GameRepository gameRepository, PropertyEntryService propertyEntryService,
							PlayerRepository playerRepository) {
		this.gameRepository = gameRepository;
		this.propertyEntryService = propertyEntryService;
		this.playerRepository = playerRepository;
	}

	public GameResponse act(UiRequest request) {
		Game game;
		try {
			game = gameRepository.getById(request.getGameId());
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Game id was not found");
		}

		return switch (request.getType()) {
			case ROLL -> handleRoll(game);
			case END_TURN -> handleEndTurn(game);
			case JAIL_WAIT -> handleJailWait(game);
			case JAIL_PAY -> handleJailPay(game);
			case JAIL_ROLL -> handleJailRoll(game);
			case BUY -> handleBuy(game);
			case DO_NOT_BUY -> handleDoNotBuy(game);
			default -> throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request type not supported");
		};
	}

	@Transactional
	private GameResponse handleRoll(Game game) {
		assertGameStep(game, List.of(GameStep.TURN_BEGIN, GameStep.RE_ROLL));
		Player currentPlayer = game.getPlayers().get(game.getPlayerTurn());
		assertPlayerIsInJail(currentPlayer, false);

		// roll the dice
		Random rnd = new Random();
		List<Integer> diceRoll = Arrays.asList(rnd.nextInt(6) + 1, rnd.nextInt(6) + 1);
		int diceSum = diceRoll.get(0) + diceRoll.get(1);
		boolean isDoubleDice = diceRoll.get(0).equals(diceRoll.get(1));

		if (isDoubleDice) {
			game.incrementDoubleDice();
		} else {
			game.clearDoubleDice();
		}

		List<UiAction> actions = new ArrayList<>();
		actions.add(new UiAction(UiActionType.DICE_ROLL, Arrays.asList(diceRoll.get(0), diceRoll.get(1),
				  isDoubleDice ? Integer.valueOf(game.getDoubleDice()) : 0)));

		if (game.getDoubleDice() >= 3) {
			// player goes straight to jail if he/she rolls a third double
			currentPlayer.sendToJail();
			actions.add(new UiAction(UiActionType.JAIL_IN, Collections.emptyList()));
			game.setState(GameStep.TURN_END);
			gameRepository.save(game);
			return new GameResponse(game.getState(), actions);
		}

		// advance the player's token
		advancePlayer(currentPlayer, diceSum);
		// default second param to 0
		actions.add(new UiAction(UiActionType.ADVANCE, List.of(diceSum, 0)));

		if (currentPlayer.getPosition() == 30) {
			// player lands on 'Go to jail'
			currentPlayer.sendToJail();
			actions.add(new UiAction(UiActionType.JAIL_IN, Collections.emptyList()));
			game.setState(GameStep.TURN_END);
			gameRepository.save(game);
			return new GameResponse(game.getState(), actions);
		}

		if (Spaces.isProperty(currentPlayer.getPosition())) {
			// player lands on a property
			Player owner = game.getPropertyRegister().getOwner(currentPlayer.getPosition());
			if (owner == null) {
				// property is not owned
				game.setState(GameStep.BUY_OR_AUCTION);
			} else {
				if (!owner.equals(currentPlayer)) {
					// property is owned by another player
					// we set the second param to 2 + ownerTurnOrder to tell UI that the property is already owned by
					// someone else
					actions.get(actions.size() - 1).setParams(List.of(diceSum, 2 + owner.getTurnOrder()));
					int rent = Spaces.getRent(game, diceSum);
					if (hasEnoughMoney(currentPlayer, rent)) {
						payTo(currentPlayer, owner, rent);
						playerRepository.saveAll(List.of(currentPlayer, owner));
						// the fourth parameter is to tell the UI whether the player is paying double rent
						boolean isDoubleRent = Spaces.hasMonopoly(game,
								  Spaces.getPropertyType(currentPlayer.getPosition())) &&
								  Spaces.getPropertyType(currentPlayer.getPosition()) != PropertyType.UTILITY;
						actions.add(new UiAction(UiActionType.PAY_TO,
								  List.of((int) currentPlayer.getTurnOrder(), (int) owner.getTurnOrder(), rent,
											 isDoubleRent ? 1 : 0)));

					} else {
						// player does not have enough money to pay the rent
					}
				} else {
					// property is already owned by currentPlayer
					// we set the second param to 1 to tell UI that the player already owns the property
					actions.get(actions.size() - 1).setParams(List.of(diceSum, 1));
				}
				game.setState(isDoubleDice ? GameStep.RE_ROLL : GameStep.TURN_END);
			}
		} else {
			// player does not land on a property
			game.setState(isDoubleDice ? GameStep.RE_ROLL : GameStep.TURN_END);
		}
		gameRepository.save(game);
		return new GameResponse(game.getState(), actions);
	}

	private int advancePlayer(Player player, int distance) {
		short currentPosition = player.getPosition();
		int endPosition = (currentPosition + distance) % 40;
		player.setPosition((short) endPosition);
		// if player passed go
		if (endPosition < currentPosition) {
			player.cashIn(200);
			playerRepository.save(player);
		}
		return endPosition;
	}

	private GameResponse handleEndTurn(Game game) {
		assertGameStep(game, List.of(GameStep.TURN_END));

		game.endTurn();
		gameRepository.save(game);
		List<UiAction> actions = List.of(new UiAction(UiActionType.NEXT_PLAYER, Collections.emptyList()));
		return new GameResponse(game.getState(), actions);
	}

	private GameResponse handleJailWait(Game game) {
		Player currentPlayer = game.getPlayers().get(game.getPlayerTurn());
		assertPlayerIsInJail(currentPlayer, true);
		assertGameStep(game, List.of(GameStep.TURN_BEGIN));

		List<UiAction> actions = new ArrayList<>();
		currentPlayer.decrementJailTurns();
		if (currentPlayer.hasZeroJailTurns()) {
			currentPlayer.freeFromJail();
			actions.add(new UiAction(UiActionType.JAIL_OUT, Collections.emptyList()));
		}
		game.setState(GameStep.TURN_END);
		gameRepository.save(game);
		return new GameResponse(game.getState(), actions);
	}

	private GameResponse handleJailPay(Game game) {
		Player currentPlayer = game.getPlayers().get(game.getPlayerTurn());
		assertPlayerIsInJail(currentPlayer, true);
		assertPlayerHasEnoughMoney(currentPlayer, 50);
		assertGameStep(game, List.of(GameStep.TURN_BEGIN));

		List<UiAction> actions = new ArrayList<>();
		currentPlayer.cashOut(50);
		game.incrementJackPot(50);
		actions.add(new UiAction(UiActionType.TAX, List.of(50, game.getJackPot())));
		currentPlayer.freeFromJail();
		actions.add(new UiAction(UiActionType.JAIL_OUT, Collections.emptyList()));
		playerRepository.save(currentPlayer);
		gameRepository.save(game);
		return new GameResponse(game.getState(), actions);
	}

	private GameResponse handleJailRoll(Game game) {
		Player currentPlayer = game.getPlayers().get(game.getPlayerTurn());
		assertPlayerIsInJail(currentPlayer, true);
		assertGameStep(game, List.of(GameStep.TURN_BEGIN));

		// roll the dice
		Random rnd = new Random();
		List<Integer> diceRoll = Arrays.asList(rnd.nextInt(6) + 1, rnd.nextInt(6) + 1);
		boolean isDoubleDice = diceRoll.get(0).equals(diceRoll.get(1));

		List<UiAction> actions = new ArrayList<>();
		actions.add(
				  new UiAction(UiActionType.DICE_ROLL, List.of(diceRoll.get(0), diceRoll.get(1), isDoubleDice ? 1 : 0)));

		if (isDoubleDice) {
			game.incrementDoubleDice();
			int distance = diceRoll.get(0) + diceRoll.get(1);
			currentPlayer.freeFromJail();
			actions.add(new UiAction(UiActionType.JAIL_OUT, Collections.emptyList()));
			advancePlayer(currentPlayer, distance);
			actions.add(new UiAction(UiActionType.ADVANCE, List.of(distance)));
			game.setState(GameStep.RE_ROLL);
			gameRepository.save(game);
			return new GameResponse(game.getState(), actions);
		}

		currentPlayer.decrementJailTurns();
		if (currentPlayer.hasZeroJailTurns()) {
			currentPlayer.freeFromJail();
			actions.add(new UiAction(UiActionType.JAIL_OUT, Collections.emptyList()));
		}
		game.setState(GameStep.TURN_END);
		gameRepository.save(game);
		return new GameResponse(game.getState(), actions);
	}

	private GameResponse handleBuy(Game game) {
		assertGameStep(game, List.of(GameStep.BUY_OR_AUCTION));
		Player currentPlayer = game.getPlayers().get(game.getPlayerTurn());
		if (Spaces.isProperty(currentPlayer.getPosition())) {
			if (game.getPropertyRegister().getOwner(currentPlayer.getPosition()) != null) {
				throw new ResponseStatusException(HttpStatus.FORBIDDEN, "The property is already owned!");
			}
		} else {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Current player is not on a property square!");
		}
		assertPlayerHasEnoughMoney(currentPlayer, Spaces.getPropertyPrice(currentPlayer.getPosition()));
		buyProperty(game, currentPlayer, currentPlayer.getPosition());
		List<UiAction> actions = new ArrayList<>();
		actions.add(new UiAction(UiActionType.BUY, List.of(Spaces.getPropertyPrice(currentPlayer.getPosition()))));
		game.setState(game.getDoubleDice() > 0 ? GameStep.RE_ROLL : GameStep.TURN_END);
		gameRepository.save(game);
		return new GameResponse(game.getState(), actions);
	}

	private GameResponse handleDoNotBuy(Game game) {
		assertGameStep(game, List.of(GameStep.BUY_OR_AUCTION));
		Player currentPlayer = game.getPlayers().get(game.getPlayerTurn());
		if (Spaces.isProperty(currentPlayer.getPosition())) {
			if (game.getPropertyRegister().getOwner(currentPlayer.getPosition()) != null) {
				throw new ResponseStatusException(HttpStatus.FORBIDDEN, "The property is already owned!");
			}
		} else {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Current player is not on a property square!");
		}
		List<UiAction> actions = new ArrayList<>();
		game.setState(game.getDoubleDice() > 0 ? GameStep.RE_ROLL : GameStep.TURN_END);
		gameRepository.save(game);
		return new GameResponse(game.getState(), actions);
	}

	private void buyProperty(Game game, Player player, int propertyId) {
		if (game.getPropertyRegister().getOwner(propertyId) == null) {
			PropertyEntry newEntry =
					  new PropertyEntry(game.getPropertyRegister(), Short.valueOf(Integer.toString(propertyId)), player);
			propertyEntryService.registerNewPropertyEntry(newEntry);
			player.cashOut(Spaces.getPropertyPrice(propertyId));
			playerRepository.save(player);
		} else {
			throw new RuntimeException("Property is already owned!");
		}
	}

	private void payTo(Player from, Player to, int amount) {
		from.cashOut(amount);
		to.cashIn(amount);
		playerRepository.saveAll(List.of(from, to));
	}

	private void assertPlayerIsInJail(Player player, boolean expected) {
		if (player.isInJail() != expected) {
			if (expected) {
				throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Player should be in jail but is not!");
			} else {
				throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Player should not be in jail but is in jail!");
			}
		}
	}

	private boolean hasEnoughMoney(Player player, Integer amount) {
		return player.getCash() >= amount;
	}

	private void assertPlayerHasEnoughMoney(Player player, Integer amount) {
		if (!hasEnoughMoney(player, amount)) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Player does not have enough money!");
		}
	}

	private void assertGameStep(Game game, List<GameStep> steps) {
		if (!steps.contains(game.getState())) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN,
					  "Wrong GameStep. GameStep should be in " + steps.toString() + ", but actually is " +
								 game.getState().toString() + ".");
		}
	}
}

package com.smooth038.monopoly.game;

import com.smooth038.monopoly.player.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.*;

@Component
public class GameEngine {
    private final GameRepository gameRepository;

    @Autowired
    public GameEngine(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public GameResponse act(UiRequest request) {
        Game game;
        try {
            game = gameRepository.getById(request.getGameId());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Game id was not found");
        }

        switch (request.getType()) {
            case ROLL -> {
                return handleRoll(game);
            }
            case END_TURN -> {
                return handleEndTurn(game);
            }
            case JAIL_WAIT -> {
                return handleJailWait(game);
            }
            case JAIL_PAY -> {
                return handleJailPay(game);
            }
            case JAIL_ROLL -> {
                return handleJailRoll(game);
            }
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request type not supported");
    }

    @Transactional
    private GameResponse handleRoll(Game game) {
        assertGameStep(game, List.of(GameStep.TURN_BEGIN, GameStep.RE_ROLL));
        Player currentPlayer = game.getPlayers().get(game.getPlayerTurn());
        assertPlayerIsInJail(currentPlayer, false);

        // roll the dice
        Random rnd = new Random();
        List<Integer> diceRoll = Arrays.asList(rnd.nextInt(6) + 1, rnd.nextInt(6) + 1);
        int distance = diceRoll.get(0) + diceRoll.get(1);
        boolean isDoubleDice = diceRoll.get(0).equals(diceRoll.get(1));

        if (isDoubleDice) {
            game.incrementDoubleDice();
        }

        List<UiAction> actions = new ArrayList<>();
        actions.add(new UiAction(UiActionType.DICE_ROLL, Arrays.asList(diceRoll.get(0), diceRoll.get(1),
                isDoubleDice ? Integer.valueOf(game.getDoubleDice()) : 0)));

        // player goes straight to jail if he/she rolls a third double
        if (game.getDoubleDice() >= 3) {
            currentPlayer.sendToJail();
            actions.add(new UiAction(UiActionType.JAIL_IN, Collections.emptyList()));
            game.setState(GameStep.TURN_END);
            gameRepository.save(game);
            return new GameResponse(game.getState(), actions);
        }

        // advance the player's token
        advancePlayer(currentPlayer, distance);
        actions.add(new UiAction(UiActionType.ADVANCE, List.of(distance)));

        game.setState(isDoubleDice ? GameStep.RE_ROLL : GameStep.TURN_END);
        gameRepository.save(game);
        return new GameResponse(game.getState(), actions);
    }

    private int advancePlayer(Player player, int distance) {
        short currentPosition = player.getPosition();
        int endPosition = (currentPosition + distance) % 40;
        player.setPosition((short) endPosition);
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

    private void assertPlayerIsInJail(Player player, boolean expected) {
        if (player.isInJail() != expected) {
            if (expected) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Player should be in jail but is not!");
            } else {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Player should not be in jail but is in jail!");
            }
        }
    }

    private void assertPlayerHasEnoughMoney(Player player, Integer amount) {
        if (player.getCash() < amount) {
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

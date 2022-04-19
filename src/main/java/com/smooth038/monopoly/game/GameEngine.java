package com.smooth038.monopoly.game;

import com.smooth038.monopoly.player.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
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
        } catch(Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Game id was not found");
        }

        switch (request.getType()) {
            case ROLL -> {
                return handleRoll(game);
            }
            case END_TURN -> {
                return handleEndTurn(game);
            }
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request type not supported");
    }

    @Transactional
    private GameResponse handleRoll(Game game) {
        List<UiAction> actions = new ArrayList<>();

        // check whether player can roll
        Player currentPlayer = game.getPlayers().get(game.getPlayerTurn());
        if (!currentPlayer.canRoll()) {
           throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Player is not allowed to roll");
        }

        // roll the dice
        Random rnd = new Random();
        List<Integer> diceRoll = Arrays.asList(rnd.nextInt(6) + 1, rnd.nextInt(6) + 1);
        actions.add(new UiAction(UiActionType.DICE_ROLL, Arrays.asList(diceRoll.get(0), diceRoll.get(1))));
        int distance = diceRoll.get(0) + diceRoll.get(1);
        boolean isDoubleDice = diceRoll.get(0).equals(diceRoll.get(1));

        if (isDoubleDice) {
            game.incrementDoubleDice();
            // player goes straight to jail if he rolls a third double
            if (game.getDoubleDice() >= 3) {
                actions.add(new UiAction(UiActionType.JAIL_IN, Collections.emptyList()));
                currentPlayer.setCanRoll(false);
                game.setState(GameStep.TURN_END);
                return new GameResponse(game.getState(), actions);
            }
        }
        // advance the player's token
        advancePlayer(currentPlayer, distance);
        actions.add(new UiAction(UiActionType.ADVANCE, List.of(distance)));

        // determine whether player can roll again
        currentPlayer.setCanRoll(isDoubleDice);
        game.setState(isDoubleDice ? GameStep.RE_ROLL : GameStep.TURN_END);
        gameRepository.save(game);
        return new GameResponse(game.getState(), actions);
    }

    private int advancePlayer(Player player, int distance) {
        short currentPosition = player.getPosition();
        int endPosition = (currentPosition + distance) % 40;
        player.setPosition((short)endPosition);
        return endPosition;
    }

    private GameResponse handleEndTurn(Game game) {
        for (Player player : game.getPlayers()) {
            player.setCanRoll(true);
        }
        game.endTurn();
        gameRepository.save(game);
        List<UiAction> actions = List.of(new UiAction(UiActionType.NEXT_PLAYER,
                List.of(Integer.valueOf(game.getPlayerTurn()))));
        return new GameResponse(game.getState(), actions);
    }
}

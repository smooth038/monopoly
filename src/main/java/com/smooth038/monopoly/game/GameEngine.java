package com.smooth038.monopoly.game;

import org.springframework.data.util.Pair;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class GameEngine {
    public List<UiAction> act(UiRequest request) {
        switch (request.getType()) {
            case ROLL -> {
                return handleRoll(request);

            }
        }
        return Collections.emptyList();
    }

    private List<UiAction> handleRoll(UiRequest request) {
        List<UiAction> actions = new ArrayList<>();

        // roll the dice
        Random rnd = new Random();
        List<Integer> diceRoll = Arrays.asList(rnd.nextInt(6) + 1, rnd.nextInt(6) + 1);


        actions.add(new UiAction(UiActionType.DICE_ROLL, Arrays.asList(diceRoll.get(0), diceRoll.get(1))));
        return actions;
    }

}

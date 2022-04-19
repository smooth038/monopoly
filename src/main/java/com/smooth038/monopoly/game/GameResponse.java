package com.smooth038.monopoly.game;

import java.util.Collections;
import java.util.List;

public class GameResponse {
    private GameStep gameStep;
    private List<UiAction> actions;

    public GameResponse(GameStep gameStep, List<UiAction> actions) {
        this.gameStep = gameStep;
        this.actions = actions;
    }

    public GameStep getGameStep() {
        return gameStep;
    }

    public void setGameStep(GameStep gameStep) {
        this.gameStep = gameStep;
    }

    public List<UiAction> getActions() {
        return actions;
    }

    public void setActions(List<UiAction> actions) {
        this.actions = actions;
    }
}

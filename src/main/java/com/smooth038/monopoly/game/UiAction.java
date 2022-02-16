package com.smooth038.monopoly.game;

import java.util.List;

public class UiAction {
    private UiActionType type;
    private List<Integer> params;

    public UiAction(UiActionType type, List<Integer> params) {
        this.type = type;
        this.params = params;
    }

    public UiActionType getType() {
        return type;
    }

    public List<Integer> getParams() {
        return params;
    }
}

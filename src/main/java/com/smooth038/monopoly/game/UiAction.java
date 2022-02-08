package com.smooth038.monopoly.game;

public class UiAction {
    private UiActionType type;
    private int[] params;

    public UiAction(UiActionType type, int[] params) {
        this.type = type;
        this.params = params;
    }
}

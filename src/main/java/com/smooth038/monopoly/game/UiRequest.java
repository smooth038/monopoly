package com.smooth038.monopoly.game;

public class UiRequest {
    private int gameId;
    private UiRequestType type;
    private int[] params;

    public UiRequest(int gameId, UiRequestType type, int[] params) {
        this.gameId = gameId;
        this.type = type;
        this.params = params;
    }

    public int getGameId() {
        return gameId;
    }

    public UiRequestType getType() {
        return type;
    }

    public int[] getParams() {
        return params;
    }
}

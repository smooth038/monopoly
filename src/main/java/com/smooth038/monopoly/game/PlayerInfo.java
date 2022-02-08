package com.smooth038.monopoly.game;

import com.smooth038.monopoly.player.Token;

public class PlayerInfo {
    private String name;
    private int token;

    public PlayerInfo(String name, int token) {
        this.name = name;
        this.token = token;
    }

    public String getName() {
        return name;
    }

    public int getToken() {
        return token;
    }
}

package com.smooth038.monopoly.game;

import java.util.List;

public class GameInfo {
    private Integer gameId;
    private List<PlayerInfo> players;

    public GameInfo(Integer gameId, List<PlayerInfo> players) {
        this.gameId = gameId;
        this.players = players;
    }

    public Integer getGameId() {
        return gameId;
    }

    public List<PlayerInfo> getPlayers() {
        return players;
    }
}

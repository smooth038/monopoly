package com.smooth038.monopoly.tile;

import com.smooth038.monopoly.player.Player;

public abstract class Property extends Tile {
    private final Integer price;
    private Player owner = null;
    private Boolean isMortgaged = false;

    public Property(Integer price) {
        this.price = price;
    }

    Player getOwner() {
        return owner;
    }

    void setOwner(Player player) {
        this.owner = player;
    }

    Boolean isMortgaged() {
        return isMortgaged;
    }

    void mortgage() {
        this.isMortgaged = true;
    }

    void unmortgage() {
        this.isMortgaged = false;
    }
}

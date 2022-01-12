package com.smooth038.monopoly.tile;

import com.smooth038.monopoly.player.Player;

import javax.persistence.*;

public abstract class Property extends Tile {
    private final short id;
    private final short price;

    public Property(short id, short price) {
        this.id = id;
        this.price = price;
    }
}

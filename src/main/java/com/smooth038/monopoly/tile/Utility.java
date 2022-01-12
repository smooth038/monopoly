package com.smooth038.monopoly.tile;

import com.smooth038.monopoly.player.Player;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

public class Utility extends Property {
    public Utility(short id) {
        super(id, (short)150);
    }

    @Override
    public void onLand(Player player) {

    }
}

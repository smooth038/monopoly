package com.smooth038.monopoly.tile;

import com.smooth038.monopoly.player.Player;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

public class Railroad extends Property {
    public Railroad(short id) {
        super(id, (short)200);
    }

    @Override
    public void onLand(Player player) {

    }
}

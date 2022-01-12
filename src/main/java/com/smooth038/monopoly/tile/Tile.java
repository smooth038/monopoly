package com.smooth038.monopoly.tile;

import com.smooth038.monopoly.player.Player;

import javax.persistence.MappedSuperclass;

public abstract class Tile {
    abstract void onLand(Player player);
}

package com.smooth038.monopoly.tile;

import com.smooth038.monopoly.player.Player;

public class Tax extends Tile {
    private TaxType type;

    public Tax(TaxType type) {
        this.type = type;
    }

    @Override
    void onLand(Player player) {

    }

    public enum TaxType {
        INCOME,
        LUXURY;
    }
}

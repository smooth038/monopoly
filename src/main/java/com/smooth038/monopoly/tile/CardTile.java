package com.smooth038.monopoly.tile;

import com.smooth038.monopoly.card.CardType;
import com.smooth038.monopoly.player.Player;

public class CardTile extends Tile {
    private final CardType type;

    public CardTile(CardType type) {
        this.type = type;
    }

    public CardType getType() {
        return type;
    }

    @Override
    void onLand(Player player) {

    }

}

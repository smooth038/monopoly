package com.smooth038.monopoly.card;

import com.smooth038.monopoly.player.Player;

import java.util.function.Function;

public class Card {
    private final short id;
    private final CardType type;
    private final Function<Player, Void> action;

    public Card(short id, CardType type, Function<Player, Void> action) {
        this.id = id;
        this.type = type;
        this.action = action;
    }

    public short getId() {
        return id;
    }

    public CardType getType() {
        return type;
    }

    public Function<Player, Void> getAction() {
        return action;
    }

}

package com.smooth038.monopoly.tile;

import com.smooth038.monopoly.player.Player;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Transient;

public class Terrain extends Property {
    private final Color color;
    private final short[] baseRent;
    private final short housePrice;

    public Terrain(short id, short price, Color color, short[] baseRent, short housePrice) {
        super(id, price);
        this.color = color;
        this.baseRent = baseRent;
        this.housePrice = housePrice;
    }

    public Color getColor() {
        return color;
    }

    public short getHousePrice() {
        return housePrice;
    }

    @Override
    public void onLand(Player player) {

    }

    public enum Color {
        DARK_PURPLE, LIGHT_BLUE, PURPLE, ORANGE, RED, YELLOW, GREEN, BLUE
    }
}

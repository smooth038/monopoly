package com.smooth038.monopoly.tile;

import com.smooth038.monopoly.player.Player;

public class Terrain extends Property {
    private final Color color;
    private final Integer[] baseRent;
    private final Integer housePrice;

    private Byte numberOfHouses = (byte)(0 & 0xFF);

    public Terrain(Integer price, Color color, Integer[] baseRent, Integer housePrice) {
        super(price);
        this.color = color;
        this.baseRent = baseRent;
        this.housePrice = housePrice;
    }

   public Color getColor() {
        return color;
    }

    public Integer getHousePrice() {
        return housePrice;
    }

    public Byte getNumberOfHouses() {
        return numberOfHouses;
    }

    public void setNumberOfHouses(Byte numberOfHouses) {
        this.numberOfHouses = numberOfHouses;
    }

   @Override
    public void onLand(Player player) {

    }

    public enum Color {
        DARK_PURPLE,
        LIGHT_BLUE,
        PURPLE,
        ORANGE,
        RED,
        YELLOW,
        GREEN,
        BLUE
    }
}

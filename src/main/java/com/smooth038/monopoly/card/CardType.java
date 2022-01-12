package com.smooth038.monopoly.card;

public enum CardType {
    CHANCE(16),
    COMMUNITY_CHEST(17);

    private int numberOfCards;

    CardType(int numberOfCards) {
        this.numberOfCards = numberOfCards;
    }

    public int getNumberOfCards() {
        return numberOfCards;
    }
}

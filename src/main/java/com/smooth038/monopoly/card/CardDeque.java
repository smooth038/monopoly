package com.smooth038.monopoly.card;

import com.smooth038.monopoly.player.Player;

import javax.persistence.*;
import java.util.*;

@Entity
@Table
public class CardDeque {
    @Id
    @SequenceGenerator(
            name = "card_deque_sequence",
            sequenceName = "card_deque_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "card_deque_sequence"
    )
    private int id;
    @Column(columnDefinition = "enum('CHANCE','COMMUNITY_CHEST')")
    @Enumerated(EnumType.STRING)
    private final CardType cardType;
    @Transient
    private Deque<Short> deque;
    private String dequeState;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gojf_owner_id", referencedColumnName = "id")
    private Player getOutOfJailFreeOwner = null;

    public CardDeque(CardType cardType) {
        this.cardType = cardType;
        this.deque = new LinkedList<>();
        this.dequeState = "";
        randomizeCards();
    }

    public CardDeque() {
        this.cardType = null;
        this.deque = new LinkedList<>();
        this.dequeState = "";
    }

    private void randomizeCards() {
        List<Integer> allNumbers = new ArrayList<>();
        for (int i = 0; i < cardType.getNumberOfCards(); i++) {
            allNumbers.add(i);
        }
        Random rand = new Random();
        for (int i = cardType.getNumberOfCards(); i > 0; i--) {
            addLast(allNumbers.remove(rand.nextInt(i)).shortValue());
        }
        dequeState.strip();
    }

    private void loadFromState() {
        Arrays.asList(dequeState.split(" ")).forEach((id) -> deque.addLast(Short.valueOf(id)));
    }

    private void addLast(Short cardId) {
        deque.addLast(cardId);
        dequeState += (" " + cardId);
    }

    private short removeFirst() {
        dequeState = dequeState.split(" ", 2)[1];
        return deque.removeFirst();
    }

    public short drawCard(Player player) {
        short cardId = deque.peekFirst();
        if (cardId == 0) {
           getOutOfJailFreeOwner = player;
        }
        addLast(cardId);
        return removeFirst();
    }

    public void putBackGetOutOfJailCard() {
        addLast((short)0);
        getOutOfJailFreeOwner = null;
    }
}

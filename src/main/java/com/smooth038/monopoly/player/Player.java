package com.smooth038.monopoly.player;

import com.smooth038.monopoly.game.Game;
import com.smooth038.monopoly.card.CardDeque;

import javax.persistence.*;
import java.util.List;

@Entity
@Table
public class Player {
    @Id
    @SequenceGenerator(
            name = "player_sequence",
            sequenceName = "player_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "player_sequence"
    )
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id", referencedColumnName = "id")
    private final Game game;

    private String name;
    @Column(columnDefinition = "enum('BOOT','CAR', 'CAT', 'DOG', 'DUCK', 'HAT', 'IRON', 'PENGUIN', 'SHIP', 'THIMBLE'," +
            " 'T_REX')")
    @Enumerated(EnumType.STRING)
    private Token token;
    @Column(columnDefinition = "TINYINT")
    private short position = 0;
    private int cash = 1500;

    private boolean isInJail = false;
    @Column(columnDefinition = "TINYINT")
    private short jailTurns = 0;

    @OneToMany(mappedBy = "getOutOfJailFreeOwner")
    private List<CardDeque> getOutOfJailFreeCards;

    public Player(Game game, String name, Token token) {
        this.game = game;
        this.name = name;
        this.token = token;
    }

    public Player() {
        this.game = new Game();
        this.name = null;
        this.token = null;
    }
    public int getId() {
        return id;
    }

    public Game getGame() {
        return game;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Token getToken() {
        return token;
    }

    public void setToken(Token token) {
        this.token = token;
    }

    public int getCash() {
        return cash;
    }

    public void setCash(short cash) {
        this.cash = cash;
    }

    public short getPosition() {
        return position;
    }

    public void setPosition(short position) {
        this.position = position;
    }

    public boolean isInJail() {
        return isInJail;
    }

    public void setIsInJail(boolean isInJail) {
        this.isInJail = isInJail;
    }

    public short getJailTurns() {
        return jailTurns;
    }

    public void setJailTurns(short jailTurns) {
        this.jailTurns = jailTurns;
    }

    public void sendToJail() {
        this.isInJail = true;
        this.jailTurns = 3;
        this.position = 10;
    }

    public void freeFromJail() {
        this.isInJail = false;
        this.jailTurns = 0;
    }

    public void decrementJailTurns() {
        this.jailTurns -= 1;
    }

    public boolean hasZeroJailTurns() {
        return this.jailTurns == 0;
    }

    public void cashIn(int amount) {
        this.cash += amount;
    }

    public void cashOut(int amount) {
        this.cash -= amount;
    }

    @Override
    public String toString() {
        return "Player{" + "id=" + id + ", game=" + game + ", name='" + name + '\'' + ", token=" + token +
                ", position=" + position + ", cash=" + cash + ", isInJail=" + isInJail + ", " +
                ", jailTurns=" + jailTurns + ", getOutOfJailFreeCards=" + getOutOfJailFreeCards + '}';
    }
}

package com.smooth038.monopoly.player;

import com.smooth038.monopoly.Game;
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
    @Column(columnDefinition = "TINYINT")
    private Token token;
    @Column(columnDefinition = "TINYINT")
    private final short playOrder;

    @Column(columnDefinition = "TINYINT")
    private short position = 0;
    private int cash = 1500;

    private boolean isInJail = false;
    private boolean hasRolled = false;
    @Column(columnDefinition = "TINYINT")
    private short jailTurns = 0;

    @OneToMany(mappedBy = "getOutOfJailFreeOwner")
    private List<CardDeque> getOutOfJailFreeCards;

    public Player(Game game, String name, Token token, short playOrder) {
        this.game = game;
        this.name = name;
        this.token = token;
        this.playOrder = playOrder;
    }

    public int getId() {
        return id;
    }

    public Game getGame() {
        return game;
    }

    public short getPlayOrder() {
        return playOrder;
    }

    public boolean isHasRolled() {
        return hasRolled;
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

    public boolean hasRolled() {
        return hasRolled;
    }

    public void setHasRolled(boolean hasRolled) {
        this.hasRolled = hasRolled;
    }

    public short getJailTurns() {
        return jailTurns;
    }

    public void setJailTurns(short jailTurns) {
        this.jailTurns = jailTurns;
    }
}

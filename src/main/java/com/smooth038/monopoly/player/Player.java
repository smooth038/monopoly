package com.smooth038.monopoly.player;

import javax.persistence.*;

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
    private Integer id;
    private String name;
    private Token token;

    private Integer cash = 1500;
    private Byte position = (byte)(0 & 0xFF);

    private Boolean isInJail = false;
    private Boolean hasRolled = false;
    private Byte jailTurns = (byte)(0 & 0xFF);

    public Player(String name, Token token) {
        this.name = name;
        this.token = token;
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

    public Integer getCash() {
        return cash;
    }

    public void setCash(Integer cash) {
        this.cash = cash;
    }

    public Byte getPosition() {
        return position;
    }

    public void setPosition(Byte position) {
        this.position = position;
    }

    public Boolean isInJail() {
        return isInJail;
    }

    public void setIsInJail(Boolean isInJail) {
        this.isInJail = isInJail;
    }

    public Boolean getHasRolled() {
        return hasRolled;
    }

    public void setHasRolled(Boolean hasRolled) {
        this.hasRolled = hasRolled;
    }

    public Byte getJailTurns() {
        return jailTurns;
    }

    public void setJailTurns(Byte jailTurns) {
        this.jailTurns = jailTurns;
    }
}

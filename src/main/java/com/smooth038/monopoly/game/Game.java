package com.smooth038.monopoly.game;

import com.smooth038.monopoly.card.CardDeque;
import com.smooth038.monopoly.card.CardType;
import com.smooth038.monopoly.player.Player;
import com.smooth038.monopoly.player.Token;
import com.smooth038.monopoly.propertyregister.PropertyRegister;
import com.smooth038.monopoly.user.User;
import org.springframework.data.util.Pair;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table
public class Game {

    @Id
    @SequenceGenerator(
            name = "game_sequence",
            sequenceName = "game_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "game_sequence"
    )
    private int id;
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "creator_id", referencedColumnName = "id")
//    private User creator;
    @OneToMany(fetch = FetchType.LAZY)
    private List<Player> players;

    @Column(columnDefinition = "TINYINT")
    private GameState state = GameState.GAME_BEGIN;

    @Column(columnDefinition = "TINYINT")
    private short playerTurn = 0;
    @Column(columnDefinition = "TINYINT")
    private short doubleDice = 0;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "register_id", referencedColumnName = "id")
    private PropertyRegister propertyRegister;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(referencedColumnName = "id")
    private CardDeque chanceDeque;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(referencedColumnName = "id")
    private CardDeque communityDeque;

    @Column(columnDefinition = "TINYINT")
    private short housesLeft = 32;
    @Column(columnDefinition = "TINYINT")
    private short hotelsLeft = 12;

    private int jackPot = 0;

    public Game() {
       this.chanceDeque = new CardDeque(CardType.CHANCE);
       this.communityDeque = new CardDeque(CardType.COMMUNITY_CHEST);
       this.propertyRegister = new PropertyRegister();
    }

    public int getId() {
        return id;
    }

    public List<Player> getPlayers() {
        return players;
    }

    public void setPlayers(List<Player> players) {
        this.players = players;
    }

    public GameState getState() {
        return state;
    }

    public short getPlayerTurn() {
        return playerTurn;
    }

    public short getDoubleDice() {
        return doubleDice;
    }

    public PropertyRegister getPropertyRegister() {
        return propertyRegister;
    }

    public CardDeque getChanceDeque() {
        return chanceDeque;
    }

    public CardDeque getCommunityDeque() {
        return communityDeque;
    }

    public short getHousesLeft() {
        return housesLeft;
    }

    public short getHotelsLeft() {
        return hotelsLeft;
    }

    public int getJackPot() {
        return jackPot;
    }

}

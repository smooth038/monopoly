package com.smooth038.monopoly;

import com.smooth038.monopoly.card.CardDeque;
import com.smooth038.monopoly.player.Player;
import com.smooth038.monopoly.propertyregister.PropertyRegister;

import javax.persistence.*;
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
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "game")
    private List<Player> players;
    @Column(columnDefinition = "TINYINT")
    private short playerTurn;

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

    private int jackPot;


}

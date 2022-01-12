package com.smooth038.monopoly;

import com.smooth038.monopoly.card.CardDeque;
import com.smooth038.monopoly.player.Player;
import com.smooth038.monopoly.propertyregister.PropertyRegister;

import javax.persistence.*;
import java.util.List;

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

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "dequeState", column = @Column(name = "chance_deque_state")),
            @AttributeOverride(name = "getOutOfJailFreeOwner", column = @Column(name = "chance_gojf_owner")),
    })
    private CardDeque chanceDeque;
    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "dequeState", column = @Column(name = "community_deque_state")),
            @AttributeOverride(name = "getOutOfJailFreeOwner", column = @Column(name = "community_gojf_owner")),
    })
    private CardDeque communityChestDeque;

    @Column(columnDefinition = "SMALLINT")
    private short jackPot;


}

package com.smooth038.monopoly.propertyregister;

import com.smooth038.monopoly.game.Game;

import javax.persistence.*;
import java.util.List;

@Entity
@Table
public class PropertyRegister {
    @Id
    @SequenceGenerator(
            name = "property_register_sequence",
            sequenceName = "property_register_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "property_register_sequence"
    )
    private int id;

    @OneToOne(fetch = FetchType.LAZY )
    @JoinColumn(name = "game_id")
    private Game game;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "propertyRegister")
    private List<PropertyEntry> propertyEntries;
}

package com.smooth038.monopoly.propertyregister;

import com.smooth038.monopoly.player.Player;

import javax.persistence.*;
import java.util.ArrayList;
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

//    @OneToOne(fetch = FetchType.LAZY )
//    @JoinColumn(name = "game_id")
//    private Game game;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "propertyRegister")
    private List<PropertyEntry> propertyEntries;

    public PropertyRegister() {
        this.propertyEntries = new ArrayList<>();
    }

    private PropertyEntry findProperty(int position) {
        for (PropertyEntry property : propertyEntries) {
            if (property.getPropertyId() == position) {
                return property;
            }
        }
        return null;
    }
    public Player getOwner(int position) {
        PropertyEntry property = findProperty(position);
        if (property != null) {
            return property.getOwner();
        }
        return null;
    }

    public Integer getNumberOfHouses(int position) {
        PropertyEntry property = findProperty(position);
        return (int) property.getNumberOfHouses();
    }
}

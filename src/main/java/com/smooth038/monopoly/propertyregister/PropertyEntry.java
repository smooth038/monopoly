package com.smooth038.monopoly.propertyregister;

import com.smooth038.monopoly.player.Player;

import javax.persistence.*;

@Entity
@Table
public class PropertyEntry {
    @Id
    @SequenceGenerator(
            name = "property_entry_sequence",
            sequenceName = "property_entry_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "property_entry_sequence"
    )
    private int id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "register_id", referencedColumnName = "id")
    private PropertyRegister propertyRegister;
    @Column(columnDefinition = "TINYINT")
    private short propertyId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", referencedColumnName = "id")
    private Player owner;

    @Column(columnDefinition = "TINYINT")
    private short numberOfHouses = 0;

    public PropertyEntry() {
    }

    public PropertyEntry(PropertyRegister register, short propertyId, Player owner) {
        this.propertyRegister = register;
        this.propertyId = propertyId;
        this.owner = owner;
    }

    public short getPropertyId() {
        return propertyId;
    }

    public Player getOwner() {
        return owner;
    }

    public short getNumberOfHouses() {
        return numberOfHouses;
    }

    public boolean isMortgaged() {
        return isMortgaged;
    }

    private boolean isMortgaged = false;
}

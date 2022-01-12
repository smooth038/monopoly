package com.smooth038.monopoly.propertyregister;

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
    @JoinColumn(name = "id")
    private PropertyRegister propertyRegister;

    private short propertyId;
    private boolean isMortgaged;
    private short numberOfHouse;
}

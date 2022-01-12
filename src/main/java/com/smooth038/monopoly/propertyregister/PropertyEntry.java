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
    @JoinColumn(name = "register_id", referencedColumnName = "id")
    private PropertyRegister propertyRegister;
    @Column(columnDefinition = "TINYINT")
    private short propertyId;

    @Column(columnDefinition = "TINYINT")
    private short numberOfHouse;

    private boolean isMortgaged;
}

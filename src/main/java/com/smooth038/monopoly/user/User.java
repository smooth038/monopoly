package com.smooth038.monopoly.user;

import com.smooth038.monopoly.game.Game;

import javax.persistence.*;
import java.util.List;

@Entity
@Table
public class User {
    @Id
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_sequence"
    )
    private int id;

    private final String email;
    private String name;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "creator")
    private List<Game> games;

    public User(String email, String name) {
        this.email = email;
        this.name = name;
    }
}

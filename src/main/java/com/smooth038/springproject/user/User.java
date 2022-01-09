package com.smooth038.springproject.user;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.Period;

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
    private Integer id;
    private String name;
    private String email;
    private LocalDate dateOfBirth;
    private Byte age;

    public User() {
    }

    public User(Integer id,
                String name,
                String email,
                LocalDate dateOfBirth)
    {
        this.id = id;
        this.name = name;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
    }

    public User(String name,
                String email,
                LocalDate dateOfBirth)
    {
        this.name = name;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Byte getAge() {
        return (byte)(Period.between(this.dateOfBirth, LocalDate.now()).getYears() & 0xFF);
    }

    public void setAge(Byte age) {
        this.age = age;
    }
}

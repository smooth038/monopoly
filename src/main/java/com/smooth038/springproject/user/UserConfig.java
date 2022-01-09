package com.smooth038.springproject.user;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@Configuration
public class UserConfig {
    @Bean
    CommandLineRunner commandLineRunner(UserRepository userRepository) {
        return args -> {
            User simon = new User(
                    "Simon",
                    "simon.lariviere.pianiste@gmail.com",
                    LocalDate.of(1985, Month.AUGUST, 16)
            );
            User jeanne = new User(
                    "Jeanne",
                    "jeanne.amiele@gmail.com",
                    LocalDate.of(1990, Month.MARCH, 21)
            );

            userRepository.saveAll(List.of(simon, jeanne));
        };
    }
}


package com.smooth038.monopoly.card;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardDequeRepository extends JpaRepository<CardDeque, Integer> {
}

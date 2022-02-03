package com.smooth038.monopoly.propertyregister;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyRegisterRepository extends JpaRepository<PropertyRegister, Integer> {
}

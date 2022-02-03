package com.smooth038.monopoly.propertyregister;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropertyRegisterService {

    private final PropertyRegisterRepository propertyRegisterRepository;

    @Autowired
    public PropertyRegisterService(PropertyRegisterRepository propertyRegisterRepository) {
        this.propertyRegisterRepository = propertyRegisterRepository;
    }

    public List<PropertyRegister> getPropertyRegisters() {
        return propertyRegisterRepository.findAll();
    }

    public void registerNewPropertyRegister(PropertyRegister propertyRegister) {
        propertyRegisterRepository.save(propertyRegister);
    }

    public void deletePropertyRegister(int propertyRegisterId) {
        if (!propertyRegisterRepository.existsById(propertyRegisterId)) {
            throw new IllegalStateException("PropertyRegister does not exist.");
        }
        propertyRegisterRepository.deleteById(propertyRegisterId);
    }

//    @Transactional
//    public void updatePropertyRegister(int propertyRegisterId, String name, Token token) {
//        PropertyRegister propertyRegister = propertyRegisterRepository.findById(propertyRegisterId)
//                .orElseThrow(() -> new IllegalStateException("PropertyRegister with id " + propertyRegisterId + " does not exist."));
//        if (name != null && name.length() > 0 && !Objects.equals(propertyRegister.getName(), name)) {
//            propertyRegister.setName(name);
//        }
//    }
}

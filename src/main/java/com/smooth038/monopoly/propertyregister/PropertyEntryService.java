package com.smooth038.monopoly.propertyregister;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropertyEntryService {

    private final PropertyEntryRepository propertyEntryRepository;

    @Autowired
    public PropertyEntryService(PropertyEntryRepository propertyEntryRepository) {
        this.propertyEntryRepository = propertyEntryRepository;
    }

    public List<PropertyEntry> getPropertyEntries() {
        return propertyEntryRepository.findAll();
    }

    public void registerNewPropertyEntry(PropertyEntry propertyEntry) {
        propertyEntryRepository.save(propertyEntry);
    }

    public void deletePropertyEntry(int propertyEntryId) {
        if (!propertyEntryRepository.existsById(propertyEntryId)) {
            throw new IllegalStateException("PropertyEntry does not exist.");
        }
        propertyEntryRepository.deleteById(propertyEntryId);
    }

    //    @Transactional
    //    public void updatePropertyEntry(int propertyEntryId, String name, Token token) {
    //        PropertyEntry propertyEntry = propertyEntryRepository.findById(propertyEntryId)
    //                .orElseThrow(() -> new IllegalStateException("PropertyEntry with id " + propertyEntryId + " does not exist."));
    //        if (name != null && name.length() > 0 && !Objects.equals(propertyEntry.getName(), name)) {
    //            propertyEntry.setName(name);
    //        }
    //    }
}

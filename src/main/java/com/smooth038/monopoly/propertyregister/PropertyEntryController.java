package com.smooth038.monopoly.propertyregister;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/property-entry")
public class PropertyEntryController {

    private final PropertyEntryService propertyEntryService;

    @Autowired
    public PropertyEntryController(PropertyEntryService propertyEntryService) {
        this.propertyEntryService = propertyEntryService;
    }

    @GetMapping
    public List<PropertyEntry> getPropertyEntries() {
        return propertyEntryService.getPropertyEntries();
    }

    @PostMapping
    public void registerNewPropertyEntry(@RequestBody PropertyEntry propertyEntry) {
        propertyEntryService.registerNewPropertyEntry(propertyEntry);
    }

    @DeleteMapping(path = "{propertyEntryId}")
    public void deletePropertyEntry(@PathVariable("propertyEntryId") int propertyEntryId) {
        propertyEntryService.deletePropertyEntry(propertyEntryId);
    }

    //    @PutMapping(path = "{propertyEntryId}")
    //    public void updatePropertyEntry(@PathVariable("propertyEntryId") int propertyEntryId, @RequestParam(required = false) String name,
    //                             @RequestParam(required = false) Token token) {
    //        propertyEntryService.updatePropertyEntry(propertyEntryId, name, token);
    //    }
}

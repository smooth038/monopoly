package com.smooth038.monopoly.propertyregister;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/property-register")
public class PropertyRegisterController {

    private final PropertyRegisterService propertyRegisterService;

    @Autowired
    public PropertyRegisterController(PropertyRegisterService propertyRegisterService) {
        this.propertyRegisterService = propertyRegisterService;
    }

    @GetMapping
    public List<PropertyRegister> getPropertyRegisters() {
        return propertyRegisterService.getPropertyRegisters();
    }

    @PostMapping
    public void registerNewPropertyRegister(@RequestBody PropertyRegister propertyRegister) {
        propertyRegisterService.registerNewPropertyRegister(propertyRegister);
    }

    @DeleteMapping(path = "{propertyRegisterId}")
    public void deletePropertyRegister(@PathVariable("propertyRegisterId") int propertyRegisterId) {
        propertyRegisterService.deletePropertyRegister(propertyRegisterId);
    }

//    @PutMapping(path = "{propertyRegisterId}")
//    public void updatePropertyRegister(@PathVariable("propertyRegisterId") int propertyRegisterId, @RequestParam(required = false) String name,
//                             @RequestParam(required = false) Token token) {
//        propertyRegisterService.updatePropertyRegister(propertyRegisterId, name, token);
//    }
}

package com.smooth038.monopoly.user;

import com.smooth038.monopoly.user.User;
import com.smooth038.monopoly.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @PostMapping
    public void registerNewUser(@RequestBody User user) {
        userService.registerNewUser(user);
    }

    @DeleteMapping(path = "{userId}")
    public void deleteUser(@PathVariable("userId") int userId) {
        userService.deleteUser(userId);
    }

    //    @PutMapping(path = "{userId}")
    //    public void updateUser(@PathVariable("userId") int userId, @RequestParam(required = false) String name,
    //                             @RequestParam(required = false) Token token) {
    //        userService.updateUser(userId, name, token);
    //    }
}

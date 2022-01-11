package com.smooth038.monopoly.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/player")
public class PlayerController {

    private final PlayerService playerService;

    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping
    public List<Player> getPlayers() {
        return playerService.getPlayers();
    }

    @PostMapping
    public void registerNewPlayer(@RequestBody Player player) {
        playerService.registerNewPlayer(player);
    }

    @DeleteMapping(path = "{playerId}")
    public void deletePlayer(@PathVariable("playerId") Integer playerId) {
        playerService.deletePlayer(playerId);
    }

    @PutMapping(path = "{playerId}")
    public void updatePlayer(@PathVariable("playerId") Integer playerId, @RequestParam(required = false) String name,
                           @RequestParam(required = false) Token token) {
        playerService.updatePlayer(playerId, name, token);
    }
}

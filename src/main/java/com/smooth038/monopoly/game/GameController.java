package com.smooth038.monopoly.game;

import com.smooth038.monopoly.player.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/game")
public class GameController {
    private final GameService gameService;

    @Autowired
    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping
    public List<Game> getGames() {
        return gameService.getGames();
    }

    @PostMapping
    public void startNewGame(@RequestBody List<PlayerInfo> players) {
       gameService.startNewGame(players);
    }

    @DeleteMapping(path = "{gameId}")
    public void deleteGame(@PathVariable("gameId") int gameId) {
        gameService.deleteGame(gameId);
    }

//    @PutMapping(path = "{gameId}")
//    public void updateGame(@PathVariable("gameId") int gameId, @RequestParam(required = false) String name,
//                             @RequestParam(required = false) Token token) {
//        gameService.updateGame(gameId, name, token);
//    }
}

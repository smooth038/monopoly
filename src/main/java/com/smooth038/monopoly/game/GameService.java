package com.smooth038.monopoly.game;

import com.smooth038.monopoly.player.Player;
import com.smooth038.monopoly.player.PlayerService;
import com.smooth038.monopoly.player.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GameService {
    private final GameRepository gameRepository;
    private final GameService self;
    private PlayerService playerService;
    private GameEngine gameEngine;


    @Autowired
    public GameService(GameRepository gameRepository, PlayerService playerService, GameEngine gameEngine) {
        this.gameRepository = gameRepository;
        this.self = this;
        this.playerService = playerService;
        this.gameEngine = gameEngine;
    }

    public List<Game> getGames() {
        return gameRepository.findAll();
    }

    public GameInfo startNewGame(List<PlayerInfo> playerInfos) {
        Game game = new Game();
        gameRepository.save(game);
        List<Player> players = new ArrayList<>();
        for (PlayerInfo player : playerInfos) {
            Player p = new Player(game, player.getName(), Token.values()[player.getToken()]);
            playerService.registerNewPlayer(p);
            players.add(p);
        }
        players.get(0).setCanRoll(true);
        game.setPlayers(players);
        gameRepository.save(game);
        return new GameInfo(game.getId(), playerInfos);
    }

    public GameResponse requestAction(UiRequest request) {
        return gameEngine.act(request);
    }

    public void deleteGame(int gameId) {
        if (!gameRepository.existsById(gameId)) {
            throw new IllegalStateException("Game does not exist.");
        }
        gameRepository.deleteById(gameId);
    }
}

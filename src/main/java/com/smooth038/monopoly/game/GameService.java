package com.smooth038.monopoly.game;

import com.smooth038.monopoly.player.Player;
import com.smooth038.monopoly.player.PlayerService;
import com.smooth038.monopoly.player.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class GameService {
    private final GameRepository gameRepository;
    private PlayerService playerService;

    @Autowired
    public GameService(GameRepository gameRepository, PlayerService playerService) {
        this.gameRepository = gameRepository;
        this.playerService = playerService;
    }

    public List<Game> getGames() {
        return gameRepository.findAll();
    }

    public void startNewGame(List<PlayerInfo> playerInfos) {
        Game game = new Game();
        gameRepository.save(game);
        List<Player> players = new ArrayList<>();
        for (PlayerInfo player : playerInfos) {
            Player p = new Player(game, player.getName(), Token.values()[player.getToken()]);
            playerService.registerNewPlayer(p);
            players.add(p);
        }
        addPlayersToGame(game.getId(), players);
    }

    public void deleteGame(int gameId) {
        if (!gameRepository.existsById(gameId)) {
            throw new IllegalStateException("Game does not exist.");
        }
        gameRepository.deleteById(gameId);
    }

    @Transactional
    public void addPlayersToGame(int gameId, List<Player> players) {
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new IllegalStateException("Game with id " + gameId + " does not exist."));
        game.setPlayers(players);
    }
}

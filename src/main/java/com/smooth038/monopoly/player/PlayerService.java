package com.smooth038.monopoly.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class PlayerService {

    private final PlayerRepository playerRepository;

    @Autowired
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public List<Player> getPlayers() {
        return playerRepository.findAll();
    }

    public void registerNewPlayer(Player player) {
        playerRepository.save(player);
    }

    public void deletePlayer(int playerId) {
        if (!playerRepository.existsById(playerId)) {
            throw new IllegalStateException("Player does not exist.");
        }
        playerRepository.deleteById(playerId);
    }

    @Transactional
    public void updatePlayer(int playerId, String name, Token token) {
        Player player = playerRepository.findById(playerId)
                .orElseThrow(() -> new IllegalStateException("Player with id " + playerId + " does not exist."));
        if (name != null && name.length() > 0 && !Objects.equals(player.getName(), name)) {
            player.setName(name);
        }
    }
}

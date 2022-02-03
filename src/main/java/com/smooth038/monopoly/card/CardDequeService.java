package com.smooth038.monopoly.card;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardDequeService {
    private final CardDequeRepository cardDequeRepository;

    @Autowired
    public CardDequeService(CardDequeRepository cardDequeRepository) {
        this.cardDequeRepository = cardDequeRepository;
    }

    public List<CardDeque> getCardDeques() {
        return cardDequeRepository.findAll();
    }

    public void registerNewCardDeque(CardType cardType) {
        CardDeque deque = new CardDeque(cardType);
        cardDequeRepository.save(deque);
    }

    public void deleteCardDeque(int cardDequeId) {
        if (!cardDequeRepository.existsById(cardDequeId)) {
            throw new IllegalStateException("CardDeque does not exist.");
        }
        cardDequeRepository.deleteById(cardDequeId);
    }

    //    @Transactional
    //    public void updateCardDeque(int cardDequeId, String name) {
    //        CardDeque cardDeque = cardDequeRepository.findById(cardDequeId)
    //                .orElseThrow(() -> new IllegalStateException("CardDeque with id " + cardDequeId + " does not exist."));
    //        if (name != null && name.length() > 0 && !Objects.equals(cardDeque.getName(), name)) {
    //            cardDeque.setName(name);
    //        }
    //    }
}

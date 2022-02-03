package com.smooth038.monopoly.card;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/card-deque")
public class CardDequeController {
    private final CardDequeService cardDequeService;

    @Autowired
    public CardDequeController(CardDequeService cardDequeService) {
        this.cardDequeService = cardDequeService;
    }

    @GetMapping
    public List<CardDeque> getCardDeques() {
        return cardDequeService.getCardDeques();
    }

    @PostMapping
    public void registerNewCardDeque(@RequestBody CardType cardType) {
        cardDequeService.registerNewCardDeque(cardType);
    }

    @DeleteMapping(path = "{cardDequeId}")
    public void deleteCardDeque(@PathVariable("cardDequeId") int cardDequeId) {
        cardDequeService.deleteCardDeque(cardDequeId);
    }

    //    @PutMapping(path = "{cardDequeId}")
    //    public void updateCardDeque(@PathVariable("cardDequeId") int cardDequeId, @RequestParam(required = false) String name,
    //                             @RequestParam(required = false) Token token) {
    //        cardDequeService.updateCardDeque(cardDequeId, name, token);
    //    }
}

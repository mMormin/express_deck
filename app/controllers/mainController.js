const dataMapper = require("../dataMapper.js");

const mainController = {
  homePage: async (req, res, next) => {
    const { error } = req.query;

    try {
      const cards = await dataMapper.getCardsList();
      res.render("cardList", {
        cards,
        title: "Liste des cartes",
        errorMessage: error,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  cardPage: async (req, res, next) => {
    const { name } = req.params;

    try {
      const card = await dataMapper.getOneCardByName(name);
      res.render("card", {
        card,
        title: `Détails d'une carte`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
      next();
    }
  },

  deckList: (req, res) => {
    res.render("deck", { title: "Votre deck", deck: req.session.deck });
  },

  addCardOnDeck: async (req, res, next) => {
    const { id: cardId } = req.params;

    const alreadyinDeck = req.session.deck.find(
      (card) => card.id === Number(cardId)
    );

    if (req.session.deck.length == 5) {
      res.status(500).redirect("/?error=deck_full");
    } else if (alreadyinDeck) {
      res.status(500).redirect("/?error=already_in_deck");
    } else if (!alreadyinDeck && req.session.deck.length <= 4) {
      try {
        const card = await dataMapper.getOneCardById(cardId);
        req.session.deck.push(card);
        res.redirect("/deck");
      } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
        next();
      }
    }
  },

  deleteCardOnDeck: (req, res) => {
    const { id: cardId } = req.params;

    req.session.deck = req.session.deck.filter(
      (card) => card.id !== Number(cardId)
    );

    res.redirect("/deck");
  },
};

module.exports = mainController;

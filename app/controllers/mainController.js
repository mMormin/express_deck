const dataMapper = require("../dataMapper.js");

const mainController = {
  homePage: async (req, res) => {
    try {
      const cards = await dataMapper.getAllCards();
      res.render("cardList", {
        cards,
        title: "Liste des cartes",
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send(`\n${error.message}`);
    }
  },

  cardPage: async (req, res, next) => {
    const { id } = req.params;

    try {
      const card = await dataMapper.getOneCardById(id);
      res.render("card", {
        card,
        title: `Détails d'une carte`,
      });
    } catch (error) {
      console.error(error);
      res
        .status(404)
        .send(`${error.message}`);
      next();
    }
  },

  deckList: (req, res) => {
    res.render("deck", { title: "Votre deck", deck: req.session.deck });
  },

  addCardOnDeck: async (req, res, next) => {
    const { id: cardId } = req.params;

    const alreadyExists = req.session.deck.find(
      (card) => card.id === Number(cardId)
    );

    if (!alreadyExists && req.session.deck.length <= 4) {
      const card = await dataMapper.getOneCardById(cardId);
      req.session.deck.push(card);
    }

    res.redirect("/deck");
  },

  deleteCardOnDeck: async (req, res, next) => {
    const { id: cardId } = req.params;

    req.session.deck = req.session.deck.filter(
      (card) => card.id !== Number(cardId)
    );

    res.redirect("/deck");
  },
};

module.exports = mainController;

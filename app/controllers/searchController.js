const dataMapper = require("./dataMapper.js");

const searchController = {
  searchPage: (req, res) => {
    res.render("search");
  },

  resultPage: async (req, res, next) => {
    const { element, level, direction, value, name } = req.query;

    try {
      if (element) {
        const cards = await dataMapper.getCardsListByElement(element);

        res.render("result", { title: "Résultat de recherche par élément :", cards });
      } else if (level) {
        const cards = await dataMapper.getCardsListByLevel(level);

        res.render("result", { title: "Résultat de recherche par niveau :", cards });
      } else if (direction) {
        const cards = await dataMapper.getCardsListByValue(direction, value);

        res.render("result", { title: "Résultat de recherche par valeur :", cards });
      } else if (name) {
        const cards = await dataMapper.getCardsListByName(name);

        res.render("result", { title: "Résultat de recherche par nom :", cards });
      }
    } catch (error) {
      console.error(error);
      res.status(404).send(`${error.message}`);
      next();
    }
  },
};

module.exports = searchController;

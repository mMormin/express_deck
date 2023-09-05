const dataMapper = require("../dataMapper.js");

const searchController = {
  searchPage: (req, res) => {
    res.render("search");
  },

  resultPage: async (req, res, next) => {
    const { element } = req.query;

    console.log(element.value)
    try {


      res
        .status(200)
        .render("result");
    } catch (error) {
      console.error(error);
      res.status(404).send(`${error.message}`);
      next();
    }
  },
};

module.exports = searchController;

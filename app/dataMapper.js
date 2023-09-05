const database = require("./database");

const dataMapper = {
  async getAllCards() {
    const query = "SELECT * FROM card";
    const result = await database.query(query);
    return result.rows;
  },

  async getOneCardById(id) {
    const query = {
      text: "SELECT * FROM card WHERE id = $1;",
      values: [id],
    };

    const result = await database.query(query);

    return result.rows[0];
  },

  async getCardsByElems(element) {

    const query = {
      text: "SELECT * FROM card WHERE element = $1 IS NOT NULL ORDER BY name ASC;",
      values: [element],
    };

    const result = await database.query(query);

    return result.rows;
  },
};

module.exports = dataMapper;

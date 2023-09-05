const database = require("./database");

const dataMapper = {
  getCardsList: async () => {
    const query = "SELECT * FROM card";
    const result = await database.query(query);
    return result.rows;
  },

  getOneCardById: async (id) => {
    const query = {
      text: "SELECT * FROM card WHERE id = $1;",
      values: [id],
    };

    const result = await database.query(query);

    return result.rows[0];
  },

  getOneCardByName: async (name) => {
    const query = {
      text: "SELECT * FROM card WHERE name = $1;",
      values: [name],
    };

    const result = await database.query(query);

    return result.rows[0];
  },

  getCardsListByName: async (name) => {
    const query = {
      text: `SELECT * FROM card WHERE LOWER(name) LIKE $1`,
      values: ["%" + name + "%"],
    };

    const result = await database.query(query);

    return result.rows;
  },

  getCardsListByElement: async (element) => {
    const query = {
      text: "SELECT * FROM card WHERE element = $1;",
      values: [element],
    };

    const result = await database.query(query);

    return result.rows;
  },

  getCardsListByLevel: async (level) => {
    const query = {
      text: "SELECT * FROM card WHERE level = $1;",
      values: [level],
    };

    const result = await database.query(query);

    return result.rows;
  },

  getCardsListByValue: async (direction, value) => {
    console.log(direction);

    switch (direction) {
      case "north":
        direction = "value_north";
        break;
      case "south":
        direction = "value_south";
        break;
      case "east":
        direction = "value_east";
        break;
      case "west":
        direction = "value_west";
        break;
      default:
        direction;
    }

    const query = {
      text: `SELECT * FROM card WHERE ${direction} = $1;`,
      values: [value],
    };

    const result = await database.query(query);

    return result.rows;
  },
};

module.exports = dataMapper;

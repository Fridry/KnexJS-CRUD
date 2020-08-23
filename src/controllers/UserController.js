const knex = require("../database");

module.exports = {
  async index(req, res) {
    const results = await knex("users");

    return res.json(results);
  },

  async show(req, res) {
    const { id } = req.params;

    const result = await knex("users").where("id", id);

    return res.json(result);
  },
};

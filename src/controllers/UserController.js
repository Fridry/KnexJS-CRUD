const knex = require("../database");

module.exports = {
  async index(req, res, next) {
    try {
      const results = await knex("users").where("deleted_at", null);

      return res.json(results);
    } catch (error) {
      next(error);
    }
  },

  async show(req, res, next) {
    try {
      const { id } = req.params;

      const result = await knex("users")
        .where({ id })
        .where("deleted_at", null);

      return res.json(result);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { username } = req.body;

      await knex("users").insert({ username });

      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { username } = req.body;
      const updated_at = knex.fn.now();

      await knex("users").update({ username, updated_at }).where({ id });

      return res.send();
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      //Soft Delete
      await knex("users").where({ id }).update("deleted_at", knex.fn.now());
      //Ou .del() para excluir definitivamente

      return res.send();
    } catch (error) {
      next(error);
    }
  },
};

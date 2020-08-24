const knex = require("../database");

module.exports = {
  async index(req, res, next) {
    try {
      const { user_id, page = 1 } = req.query;

      const query = knex("projects")
        .limit(5)
        .offset((page - 1) * 5);

      const countObj = knex("projects").count();

      if (user_id) {
        query
          .where({ user_id })
          .join("users", "users.id", "=", "projects.user_id")
          .select("projects.*", "users.username")
          .where("users.deleted_at", null);

        countObj.where({ user_id });
      }

      const [count] = await countObj;

      res.header("X-Total-Count", count["count"]);

      const results = await query;

      return res.json(results);
    } catch (error) {
      next(error);
    }
  },

  async show(req, res, next) {
    try {
      const { id } = req.params;
      const { page = 1 } = req.query;

      const result = await knex("projects")
        .where("projects.id", id)
        .join("users", "users.id", "=", "projects.user_id")
        .select("projects.*", "users.username")
        .limit(5)
        .offset((page - 1) * 5);

      return res.json(result);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { title, user_id } = req.body;

      await knex("projects").insert({ title, user_id });

      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { title, user_id } = req.body;
      const updated_at = knex.fn.now();

      await knex("projects")
        .update({ title, user_id, updated_at })
        .where({ id });

      return res.send();
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      await knex("projects").where({ id }).del();

      return res.send();
    } catch (error) {}
  },
};

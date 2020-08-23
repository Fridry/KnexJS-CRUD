const express = require("express");

const routes = express.Router();

const UserController = require("./controllers/UserController");

routes.get("/users", UserController.index);
routes.get("/users/:id", UserController.show);

module.exports = routes;

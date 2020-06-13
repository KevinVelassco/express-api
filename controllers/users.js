const { User } = require("../models");

class UsersController {
  async index(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      res.json(err);
    }
  }
  async create(req, res) {
    try {
      const user = await User.create({
        email: req.body.email,
        password: req.body.password
      });
      res.json(user);
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = new UsersController();

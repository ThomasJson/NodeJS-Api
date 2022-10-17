const { Account } = require("../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");
const auth = require('../auth/auth')

module.exports = (app) => {
  app.post("/api/accounts", auth, (req, res) => {
    Account.create(req.body)
      .then((account) => {
        const message = `Le compte ${req.body.name} a bien été crée.`;
        res.json({ message, data: account });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message = `Le compte n'a pas pu être ajouté. Réessayez dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
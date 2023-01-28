const { Account } = require("../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");
const auth = require('../auth/auth')

module.exports = (app) => {
  app.put("/api/accounts/:id", auth, (req, res) => {
    const id = req.params.id;
    // .update : méthode de sequelize
    Account.update(req.body, {
      where: { id: id },
    })
      .then((_) => {
        // On peut transmettre une promesse contenue dans un bloc then
        // Au bloc Catch suivant en cas d'erreur en utilisant return
        // Permet de transmettre l'erreur éventuelle de la méthode findByPk
        return Account.findByPk(id).then((account) => {
          if (account === null) {
            const message = `Le compte demandé n'existe pas. Réessayez avec un autre identifiant.`;
            return res.status(404).json({ message });
          }
          const message = `Le compte ${account.firstName} a bien été modifié.`;
          res.json({ message, data: account });
        });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
            return res.status(400).json({ message: error.message, data: error });
          }
        const message = `Le compte n'a pas pu être modifié. Réessayez dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};

const { Account } = require("../db/sequelize");
const auth = require('../auth/auth')

module.exports = (app) => {
  app.delete("/api/accounts/:id", auth, (req, res) => {
    Account.findByPk(req.params.id)
      .then((account) => {
        if (account === null) {
          const message = `Le compte demandé n'existe pas. Réessayez avec un autre identifiant.`;
          return res.status(404).json({ message });
        }
        const accountDeleted = account;
        return Account.destroy({
          where: { id: account.id },
        }).then((_) => {
          const message = `Le compte avec l'identifiant n°${accountDeleted.id} a bien été supprimé.`;
          res.json({ message, data: accountDeleted });
        });
      })
      .catch((error) => {
        const message = `Le compte n'a pas pu être supprimé. Réessayez dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
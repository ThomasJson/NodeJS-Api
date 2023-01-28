const { Account } = require("../db/sequelize");

module.exports = (app) => {
  app.get("/api/accounts/:id", (req, res) => {
    Account.findByPk(req.params.id)
      .then((account) => {
        if(account === null) {
          const message = `Le compte demandé n'existe pas. Réessayez avec un autre identifiant.`;
          return res.status(404).json({ message });
        }
        const message = "Un compte a bien été trouvé.";
        res.json({ message, data: account });
      })
      .catch((error) => {
        const message = `Le compte n'a pas pu être récupérée. Réessayez dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
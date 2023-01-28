const { Account } = require("../db/sequelize");
const { Op } = require("sequelize");

module.exports = (app) => {
  app.get("/api/accounts", (req, res) => {
    if (req.query.firstName) {
      const firstName = req.query.firstName;
      const limitDefined = parseInt(req.query.limit) || 5;
      return Account.findAndCountAll({
        where: {
          firstName: {
            [Op.like]: `%${firstName}%`,
          },
        },
        order: ["firstName"],
        limit: limitDefined,
      }).then(({ count, rows }) => {
        const message = `Il y a ${limitDefined} comptes qui correspondent au terme de la recherche ${firstName}.`;
        res.json({ message, data: rows });
      });
    }
    // else {}
    Account.findAll({ order: ["id"] })
      .then((accounts) => {
        const message = "La liste des comptes a bien été récupérée.";
        res.json({ message, data: accounts });
      })
      .catch((error) => {
        const message = `La liste des comptes n'a pas pu être récupérée. Réessayez dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
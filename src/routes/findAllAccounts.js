const { Account } = require("../db/sequelize");
// On importe le modèle Pokemon, fourni par le module sequelize
const { Op } = require("sequelize");
// Un opérateur se déclare entre crochets

module.exports = (app) => {
  // express nous permet d'ajouter un middleWare en deuxième argument d'une nouvelle route
  app.get("/api/accounts", (req, res) => {
    // Paramètre de requête
    if (req.query.name) {
      // Permet d'indiquer à express que l'on souhaite
      // extraire le paramètre de requête name, de l'URL
      const name = req.query.name;
      // Valeur indiquée dans l'URL ou 5 (valeur par défaut)
      const limitDefined = parseInt(req.query.limit) || 5;

      // if (name.length < 2) {
      //   const message =
      //     "Le terme de recherche doit contenir au moins 2 caractères.";
      //   return res.status(400).json({ message });
      // }

      return Account.findAndCountAll({
        where: {
          name: {
            // name est la propriété du modèle pokémon
            [Op.like]: `%${name}%`, // name est le critère de la recherche
          },
          // limit est donc une propriété de la méthode findAll
          // 5 résultats
        },
        order: ["name"],
        // ['name'] est un raccourci de language pour dire
        // ['name', 'ASC'] qui est la valeur par défaut
        limit: limitDefined,
      }).then(({ count, rows }) => {
        const message = `Il y a ${limitDefined} comptes qui correspondent au terme de la recherche ${name}.`;
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
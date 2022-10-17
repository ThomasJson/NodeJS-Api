// http://localhost:3000/api/accounts

// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2NjAzMTU3NSwiZXhwIjoxNjY2MTE3OTc1fQ.qOwJ7u4uQqMkVjgBc82Q1Uq1PWmhhNCAIt4Rj9yY9ZQ"

const express = require("express");

const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize");

const app = express();
const port = 3000;

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json());

sequelize.initDb();

require("./src/routes/findAllAccounts")(app);
require("./src/routes/findAccountByPk")(app);
require("./src/routes/createAccount")(app);
require("./src/routes/updateAccount")(app);
require("./src/routes/deleteAccount")(app);
require("./src/routes/login")(app);

// On ajoute la gestion des erreurs 404
app.use(({ res }) => {
  const message =
    "Impossible de se connecter à la ressource demandée ! Vous pouvez essayer une autre URL.";
  res.status(404).json({ message });
});

app.listen(port, () =>
  console.log(
    `Notre application Node est démarrée sur : http://localhost:${port}`
  )
);

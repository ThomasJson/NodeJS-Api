// http://localhost:3000/api/accounts

const express = require("express");

const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");

const { success, getUniqueId } = require("./helper.js");
let accounts = require("./accounts-list");

const app = express();
const port = 3000;

const sequelize = new Sequelize("boost", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});

sequelize
  .authenticate()
  .then((_) => console.log("la connexion à la bdd a bien été établie"))
  .catch((error) =>
    console.error(`Impossible de se connecter à la base de données ${error}`)
  );

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json());

app.get("/api/accounts", (req, res) => {
  const message = "La liste des comptes a bien été récupérée.";
  res.json(success(message, accounts));
});

app.get("/api/accounts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const account = accounts.find((account) => account.id === id);
  const message = "Un compte a bien été trouvé.";
  res.json(success(message, account));
});

app.post("/api/accounts", (req, res) => {
  const id = getUniqueId(accounts);
  const accountCreated = { ...req.body, ...{ id: id, created: new Date() } };
  accounts.push(accountCreated);
  const message = `Le compte ${accountCreated.name} a bien été crée.`;
  res.json(success(message, accountCreated));
});

app.put("/api/accounts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const accountUpdated = { ...req.body, id: id };
  accounts = accounts.map((account) => {
    return account.id === id ? accountUpdated : account;
  });

  const message = `Le compte ${accountUpdated.name} a bien été modifié.`;
  res.json(success(message, accountUpdated));
});

app.delete("/api/accounts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const accountDeleted = accounts.find((account) => account.id === id);
  accounts = accounts.filter((account) => account.id !== id);
  const message = `Le compte ${accountDeleted.name} a bien été supprimé.`;
  res.json(success(message, accountDeleted));
});

app.listen(port, () =>
  console.log(
    `Notre application Node est démarrée sur : http://localhost:${port}`
  )
);

// http://localhost:3000

const express = require("express");
const { success } = require("./helper.js");
let accounts = require("./accounts-list");

const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello, Express 3!"));

// On retourne la liste des comptes au format JSON, avec un message :
app.get('/api/accounts', (req, res) => {
    const message = 'La liste des comptes a bien été récupérée.'
    res.json(success(message, accounts)) 
  })

app.get("/api/accounts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const account = accounts.find((account) => account.id === id);
  const message = "Un compte a bien été trouvé.";
  res.json(success(message, account));
});

app.listen(port, () =>
  console.log(
    `Notre application Node est démarrée sur : http://localhost:${port}`
  )
);

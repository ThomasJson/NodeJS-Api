// http://localhost:3000/api/accounts
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2NzMwNzg3NSwiZXhwIjoxNjY3Mzk0Mjc1fQ.YHcA5sWQhlSGIPzZU8MMZcJ9Ud6ClmhtpZHh6DxF-Uc

const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./src/db/sequelize");

const app = express();
const port = 3000;

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json())
  .use(cors());

sequelize.initDb();

app.get('/', (req, res) =>{
  res.json("Hello Boost !");
})

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
const { Sequelize, DataTypes } = require("sequelize");
const AccountModel = require("../models/account");
const accounts = require("./accounts-list.js");

const sequelize = new Sequelize("boost", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});

const Account = AccountModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync({ force: true }).then((_) => {
    accounts.map((account) => {
      Account.create({
        name: account.name,
        email: account.email,
        password: account.password,
      });
    });
    console.log("La base de donnée a bien été initialisée !");
  });
};

module.exports = {
  initDb,
  Account,
};
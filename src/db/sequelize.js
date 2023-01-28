const { Sequelize, DataTypes } = require("sequelize");
const AccountModel = require("../models/account");
const UserModel = require("../models/user");
const accounts = require("./accounts-list.js");
const bcrypt = require("bcrypt");

const sequelize = new Sequelize("boost", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});

const User = UserModel(sequelize, DataTypes);
const Account = AccountModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync({ force: true }).then((_) => {
    accounts.map((account) => {
      Account.create({
        firstName: account.firstName,
        lastName: account.lastName,
        email: account.email,
        password: account.password,
        birthday: account.birthday,
      });
    });
    bcrypt
      .hash("pikachu", 10)
      // .hash prend 2 params: mp, nb Entier(temps pour hasher un mp)
      .then((hash) => User.create({ username: "pikachu", password: hash }))
      // On récupère le mp crypté
      .then((user) => console.log(user.toJSON()));
    console.log("La base de donnée a bien été initialisée !");
  });
};

module.exports = {
  initDb,
  User,
  Account,
};

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "account",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: "^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$",
          notNull: { msg: "Le nom de compte est une propriété requise." },
          notEmpty: { msg: "Le nom de compte ne doit pas être vide." },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
          notNull: { msg: "L'email est une propriété requise." },
          notEmpty: { msg: "L'email ne doit pas être vide." },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          // is: "^[a-zA-Z]\w{3,14}$",
          notNull: { msg: "Le mot de passe est une propriété requise." },
          notEmpty: { msg: "Le mot de passe ne doit pas être vide." },
        },
      },
      birthday: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },

    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};

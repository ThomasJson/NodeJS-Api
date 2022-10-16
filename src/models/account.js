module.exports = (sequelize, DataTypes) => {
    return sequelize.define('account', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, 
    
    {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }
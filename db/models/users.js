const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // create our associations

    static associate(models) {
      // create associations in here
      User.hasMany(models.item)
    }
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        isEmail: true
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
      },
      gender: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "user",
      timestamps: true,
      underscored: true,
    }
  );

  return User
};

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    // create our associations

    static associate(models) {
      // create associations in here
      Item.belongsTo(models.user);
      Item.belongsToMany(models.category, { through: "items_categories" });
    }
  }

  Item.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "item",
      timestamps: true,
      underscored: true,
    }
  );

  return Item;
};

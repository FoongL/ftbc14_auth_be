const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    // create our associations

    static associate(models) {
      // create associations in here
      Category.belongsToMany(models.item, {through: "items_categories"})
    }
  }

  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "category",
      timestamps: true,
      underscored: true,
    }
  );

  return Category
};

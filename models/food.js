const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Food extends Model { }

//MODEL FOR FOODS FROM EACH KITCHEN
Food.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
        },
    kitchen_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'kitchen',
              key: 'id',
            },
    },
    food_name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    ingredients: {
      type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
        image_url: {
          type: DataTypes.STRING,
          defaultValue: "/images/placeholder-food.jpeg"
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'food',
  }
);

module.exports = Food;
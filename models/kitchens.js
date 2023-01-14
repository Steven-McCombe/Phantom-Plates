const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Kitchen extends Model {}

Kitchen.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
        },
    user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id',
            },
    },
    kitchen_name: {
        type: DataTypes.STRING,
    },
    location: {
        type: DataTypes.STRING,
    },
    neighborhood: {
      type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING,
    },
    cuisine: {
        type: DataTypes.STRING,
    },
    available: {
        type: DataTypes.BOOLEAN,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    delivery_radius:{
      type: DataTypes.INTEGER,
    },
    delivery_time:{
      type: DataTypes.INTEGER,
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
    modelName: 'kitchen',
  }
);

module.exports = Kitchen;
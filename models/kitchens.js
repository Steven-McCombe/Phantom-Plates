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
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
        },
        image_url: {
        type: DataTypes.STRING
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
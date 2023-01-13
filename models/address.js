const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');


//MODEL FOR USER AND KITCHEN ADDRESSES

class Address extends Model {}

Address.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
        },
    zip: {
            type: DataTypes.INTEGER,
            allowNull: false,
    },
    apt_no: {
            type: DataTypes.STRING,
            allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
    type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
          },
    },
    kitchen_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'kitchen',
            key: 'id',
              },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'address',
  }
);

module.exports = Address;

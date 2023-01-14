// //Order Model for when needed.

// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

// class Order extends Model { }

// //MODEL FOR FOODS FROM EACH KITCHEN
// Order.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//         },
//     kitchen_id: {
//             type: DataTypes.INTEGER,
//             references: {
//               model: 'kitchen',
//               key: 'id',
//             },
//     },
//     food_name: {
//         type: DataTypes.INTEGER,
//         references: {
//           model: 'food',
//           key: 'name',
//         },
//     },
//     food_id: {
//         type: DataTypes.INTEGER,
//         references: {
//           model: 'food',
//           key: 'id',
//         },
//     },
//     description: {
//         type: DataTypes.STRING,
//     },
//     price: {
//         type: DataTypes.DECIMAL(10, 2),
//     },

//     created_at: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: DataTypes.NOW,
//     },
//   },
//   {
//     sequelize,
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     modelName: 'order',
//   }
// );

// module.exports = Order;
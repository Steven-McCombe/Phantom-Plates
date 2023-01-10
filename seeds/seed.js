const sequelize = require('../config/connection');
const { User, Kitchen, Comments, Food } = require('../models');

const userData = require('./userData.json');
const kitchenData = require('./kitchenData.json');
const commentData = require('./commentData.json');
const foodData = require('./foodData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });
// SEED USERS TO DATABASE
console.log('\n ----- Adding Users -----\n')
const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
});
  console.log('\n ----- Sample Users added to the database -----\n')   

// SEED KITCHENS TO DATABASE
  console.log('\n ----- Adding sample Kitchens to the database -----\n')   
  
  const kitchens = await Kitchen.bulkCreate(kitchenData, {
    individualHooks: true,
    returning: true,
});
  console.log('\n ----- Sample Kitchens added to the database -----\n')  

// SEED COMMENTS TO DATABASE
  console.log('\n ----- Adding sample Comments to the database -----\n')   
  
  const comments = await Comments.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
});
  console.log('\n ----- Sample comments added to the database -----\n') 

//SEED FOODS TO DATABASE
  console.log('\n ----- Adding sample Foods to the database -----\n')   
  
  const foods = await Food.bulkCreate(foodData, {
    individualHooks: true,
    returning: true,
});
    console.log('\n ----- Sample food added to the database -----\n')   
    
  process.exit(0);
};

seedDatabase();
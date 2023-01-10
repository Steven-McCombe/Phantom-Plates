const sequelize = require('../config/connection');
const { User, Blog, Comments } = require('../models');

const userData = require('./userData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });
// Seed USERS to database
console.log('\n ----- Adding Users -----\n')
const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
});
    console.log('\n ----- Sample users added to the database -----\n')   
    
  process.exit(0);
};

seedDatabase();

const User = require('./User')
const Comments = require('./comments')
const Food = require('./food')
const Kitchen = require('./kitchens')
const Address = require('./address')
// const Order = require('./order')

//Many to one Relationship - User has Many comments but a comment can only have one user.
//If the user is deleted CASCADE will delete all their comment entries.
User.hasMany(Comments, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})
//User has only one kitchen for now. Future dev may allow for many.
User.hasOne(Kitchen, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Kitchen.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})
Kitchen.hasMany(Comments, {
    foreignKey: 'kitchen_id',
    onDelete: 'CASCADE'
})

Comments.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Comments.belongsTo(Kitchen, {
    foreignKey: 'kitchen_id',
    onDelete: 'CASCADE'
})

Address.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})
Address.belongsTo(Kitchen, {
    foreignKey: 'kitchen_id',
    onDelete: 'CASCADE'
})


module.exports = { Kitchen, User, Comments, Food, Address };
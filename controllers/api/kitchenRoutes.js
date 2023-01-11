const router = require('express').Router();
const { Comments, Food, Kitchen, User, Address} = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
const { where } = require('sequelize');


  // Get all kitchens with comments and names of person created the comment through the user model 
  router.get('/', async (req, res) => {
    try {
      const dbKitchen = await Kitchen.findAll({
        include: [
          {
            model: Comments,
            attributes: ['id', 'rating', 'comment_body', 'created_at', 'user_id'],
            include: [
              {
                model: User,
                attributes: ['name'],
                as: 'user',
              }
            ]
          },
        ]
      });
      res.json(dbKitchen)
    } catch (err) {
      res.status(500).json(err)
    }
  });

module.exports = router;
const router = require('express').Router();
const { Comments, Food, Kitchen, User, Address} = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
const { where } = require('sequelize');


  // Get all kitchens
  router.get('/', async (req, res) => {
    try {
      const dbKitchen = await Kitchen.findAll({

  
      });
      res.json(dbKitchen)
    } catch (err) {
      res.status(500).json(err)
    }
  });

module.exports = router;
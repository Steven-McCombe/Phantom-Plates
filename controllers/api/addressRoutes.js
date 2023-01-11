const router = require('express').Router();
const { Comments, Food, Kitchen, User, Address} = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
const { where } = require('sequelize');


  
  // Get all Addresses
  router.get('/', async (req, res) => {
    try {
      const dbAddress = await Address.findAll({
      });
      res.json(dbAddress)
    } catch (err) {
      res.status(500).json(err)
    }
  });

  module.exports = router;
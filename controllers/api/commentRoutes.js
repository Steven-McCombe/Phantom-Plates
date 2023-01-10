const router = require('express').Router();
const { Comments, Food, Kitchen, User} = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
const { where } = require('sequelize');

// Create a new comment
router.post('/', async (req, res) => {
    try {
      const dbComment = await Comments.create(req.body);
      res.json(dbComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  // Get all comments
  router.get('/', async (req, res) => {
    try {
      const dbComment = await Comments.findAll({
        attributes: ['id', 'rating', 'comment_body', 'created_at', 'kitchen_id', 'user_id'],
        include: [
          {
            model: User,
            attributes: ['name'],
            exclude: ['password']
          },
          {
            model: Kitchen,
            attributes: ['kitchen_name']
          },
        ],
        order: [['created_at', 'DESC']],
  
      });
      res.json(dbComment)
    } catch (err) {
      res.status(500).json(err)
    }
  });
  
  // Get a comment by ID
  router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id
      const dbComment = await Comments.findByPk(id, {
      attributes: ['id', 'rating', 'comment_body', 'created_at', 'kitchen_id', 'user_id'],
      include: [
        {
          model: User,
          attributes: ['name'],
          exclude: ['password']
        },
        {
          model: Kitchen,
          attributes: ['kitchen_name']
        },
      ],
      order: [['created_at', 'DESC']],

    });
      
      if (!dbComment) {
        return res.status(404).json({ message: 'Comment not found.' });
      }
      res.json(dbComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  module.exports = router;
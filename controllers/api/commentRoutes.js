const router = require('express').Router();
const { Comments, Food, Kitchen, User, Address} = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
const { where } = require('sequelize');


  
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
            attributes: ['kitchen_name', 'id']
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


  // Create a new comment
//TODO Add withAuth, ('/', withAuth, async back after testing to ensure only signed in users can
router.post('/', async (req, res) => {
  // If user is logged in, this will create a new comment
  //request json should look similar to this for testing feel free to add your own comments, ratings etc.
  // {
  //   "rating": 5,
  //   "comment_body": "ROUTE TEST - this is a test comment to test the post route",
  //   "kitchen_id": 2,
  //   "user_id": 3
  //   }
  try {
    const dbComment = await Comments.create({
      comment_body: req.body.comment_body,
      rating: req.body.rating,
      user_id: req.session.user_id, //TODO When live.
      kitchen_id:  req.body.kitchen_id,
    });
    res.json(dbComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Edit comment request
//TODO Add withAuth ('/', withAuth, async back after testing to ensure only users who created the comment can edit
router.put('/:id', async (req, res) => {
try {
  const dbComment = await Comments.update(
    {
      comment_body: req.body.comment_body,
      rating: req.body.rating,
      user_id: req.session.user_id,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  res.json(dbComment);
} catch (err) {
  console.log(err);
  res.status(500).json(err);
}
});

//TODO Add withAuth ('/', withAuth, async back after testing to ensure only users who created the comment can edit
router.delete('/:id', async (req, res) => {
  try {
   const dbComment = await Comments.destroy({
      where: {
       id: req.params.id,
      // user_id: req.session.user_id //!Add this in when live.
      },
    });
    res.json(dbComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

  module.exports = router;
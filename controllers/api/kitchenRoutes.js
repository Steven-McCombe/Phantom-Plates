const router = require('express').Router();
const { Comments, Food, Kitchen, User, Address} = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
const { where } = require('sequelize');



//GET ALL KITCHENS - ALSO INCLUDES RELATED COMMENTS AND USER WHO MADE THE COMMENT
  router.get('/', async (req, res) => {
    try {
      const dbKitchen = await Kitchen.findAll({
        include: [
          {
            model: Comments,
            attributes: ['id', 'rating', 'comment_body', 'created_at', 'user_id', 'kitchen_id'],
            include: [
              {
                model: User,
                attributes: ['name'],
                as: 'user',
              }
            ]
          },
          {
            model: Food,
          }
        ]
      });
      res.json(dbKitchen)
    } catch (err) {
      res.status(500).json(err)
    }
  });

//GET A KITCHEN BY ID - ALSO INCLUDES RELATED COMMENTS AND USER WHO MADE THE COMMENT
  router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id
      const dbKitchen = await Kitchen.findByPk(id, {
        include: [
          {
            model: Comments,
            attributes: ['id', 'rating', 'comment_body', 'created_at', 'user_id', 'kitchen_id'],
            include: [
              {
                model: User,
                attributes: ['name'],
                as: 'user',
              }
            ]
          },
          {
            model: User,
          }
        ]
    });
      
      if (!dbKitchen) {
        return res.status(404).json({ message: 'Comment not found.' });
      }
      res.json(dbKitchen);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // CREATE A NEW KITCHEN ROUTE
//TODO Add withAuth, ('/', withAuth, async back after testing to ensure only signed in users can
router.post('/', async (req, res) => {
  // If user is logged in, this will create a new kitchen
  //request json should look similar to this for testing feel free to add your own comments, ratings etc.
  // {
  //   "user_id": 4, // make sure the user does not have a kitchen already.
  //   "kitchen_name": "Stevens Kitchen",
  //   "location": "New York, NY",
  //   "description": "Tasty Treats",
  //   "cuisine": "International",
  //   "available": true,
  //   "image_url": "https://via.placeholder.com/150"
  // }
  try {
    const dbKitchen = await Kitchen.create({
      kitchen_name: req.body.kitchen_name,
      location: req.body.location,
      description: req.body.description,
      cuisine: req.body.cuisine,
      available: req.body.available, //this is BOOLEAN value.
      image_url: req.body.image_url
    });
    res.json(dbKitchen);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//EDIT KITCHEN REQUEST
//TODO Add withAuth ('/', withAuth, async back after testing to ensure only users who created the comment can edit
router.put('/:id', async (req, res) => {
  try {
    const dbKitchen = await Kitchen.update(
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
    res.json(dbKitchen);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  });

//DELETE KITCHEN ROUTE
//TODO Add withAuth ('/', withAuth, async back after testing to ensure only users who created the comment can edit
router.delete('/:id', async (req, res) => {
  try {
    const dbKitchen = await Kitchen.destroy({
      where: {
        id: req.params.id,
        // user_id: req.session.user_id //!Add this in when live.
      },
    });
    res.json(dbKitchen);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
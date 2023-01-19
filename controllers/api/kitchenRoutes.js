const router = require('express').Router();
const { Comments, Food, Kitchen, User, Address} = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
const { where } = require('sequelize');



//GET ALL KITCHENS - ALSO INCLUDES RELATED COMMENTS AND USER WHO MADE THE COMMENT
//RENDER HOMEPAGE
router.get('/', async (req, res) => {
  try {
      // Get all Kitchens and JOIN with user data
      const dbKitchen = await Kitchen.findAll({
          include: [
              {
                  model: User,
                  attributes: ['name'],
              },
              {
                  model: Food,
                  attributes: ['kitchen_id', 'food_name', 'description', 'ingredients', 'price', 'image_url'],
              },
          ],
          order: [['created_at', 'DESC']],
      });

      if (!dbKitchen) {
        return res.status(404).json({ message: 'Kitchen not found.' });
      }
      res.json(dbKitchen);
    } catch (err) {
      res.status(400).json(err);
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
router.post('/', withAuth, async (req, res) => {
  try {
    const dbKitchen = await Kitchen.create({
      where: {
        id: req.session.user_id
      },
      kitchen_name: req.body.kitchen_name,
      location: req.body.location,
      description: req.body.description,
      cuisine: req.body.cuisine,
      image_url: req.body.image_url,
      delivery_radius: req.body.delivery_radius,
      delivery_time: req.body.delivery_time
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
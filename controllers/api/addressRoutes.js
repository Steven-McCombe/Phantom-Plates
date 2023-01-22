const router = require('express').Router();
const { Comments, Food, Kitchen, User, Address} = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
const { where } = require('sequelize');


// GET ALL ADDRESSES WITH THEIR USERNAMES  
  router.get('/', async (req, res) => {
    try {
      const dbAddress = await Address.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
            exclude: ['password']
          },
        ],
      });
      res.json(dbAddress)
    } catch (err) {
      res.status(500).json(err)
    }
  });

  // Get a comment by ID
  router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id
      const dbAddress = await Address.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ['name'],
          exclude: ['password']
        },
      ],
      order: [['created_at', 'DESC']],

    });
      
      if (!dbAddress) {
        return res.status(404).json({ message: 'Comment not found.' });
      }
      res.json(dbAddress);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// CREATE A NEW ADDRESS
//TODO Add withAuth, ('/', withAuth, async back after testing to ensure only signed in users can
router.post('/', async (req, res) => {
  // If user is logged in, this will create a new address
  //request json should look similar to this for testing feel free to add your own address.
//   {
//     "street": "4 4th Street",
//     "city": "Denver",
//     "state": "Colorado",
//     "zip": 80014,
//     "apt_no": "4D",
//     "country": "USA",
//     "user_id": 4,
// }

  try {
    const dbAddress = await Address.create({
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      apt_no: req.body.apt_no,
      country: req.body.country,
      user_id: req.session.user_id, 

    });
    res.json(dbAddress);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//EDIT AN ADDRESS
router.put('/:id', async (req, res) => {
  try {
    const dbAddress = await Address.update(
      {
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        apt_no: req.body.apt_no,
        country: req.body.country,
        user_id: req.body.user_id, //when testing //!Remove or comment out this line for deployment
        // user_id: req.session.user_id, //TODO When live.
        kitchen_id:  req.body.kitchen_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json(dbAddress);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  });

  // DELETE AN ADDRESS 
router.delete('/', withAuth, async (req, res) => {
  try {
   const dbAddress = await Address.destroy({
      where: {
        user_id: req.session.user_id
      },
    });
    res.json(dbAddress);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

  module.exports = router;
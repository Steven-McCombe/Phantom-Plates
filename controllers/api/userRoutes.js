const router = require('express').Router();
const { Comments, Food, Kitchen, User, Address } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
const { where } = require('sequelize');


//Get all users
router.get('/', async (req, res) => {
    try {
      const userData = await User.findAll({
        attributes: ['id', 'name', 'email',],
        exclude: ['password'],
        order: [['id', 'ASC']],
  
      });
      res.json(userData)
    } catch (err) {
      res.status(500).json(err)
    }
});
  
//Get users by ID
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findAll({
      where: { id: req.params.id },
      exclude: ['password'],
      include: {
        model: Kitchen,
        include: {
          model: Food
        }
      }
    });
    res.json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  
  
  //Create a new User and save their session id
  router.post('/', async (req, res) => {
    try {
      const userData = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
      });
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        res.status(200).json(userData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.put('/', withAuth, async (req, res) => {
    try {
      const userData = await User.update({
        bio: req.body.bio,
        allergies: req.body.allergies,
        role: req.body.role,
        image_url: req.body.image_url
      },
      { where: { 
        id: req.session.user_id
      }});
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        res.status(200).json(userData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // Login route. Verify if user exists
  router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });
  // log out route. Destroys the session cookie
  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router;
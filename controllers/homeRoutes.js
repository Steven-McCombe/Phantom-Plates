const router = require('express').Router();
const sequelize = require('../config/connection');
const { Comments, Food, Kitchen, User, Address} = require('../models');
const withAuth = require('../utils/auth');

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

        const kitchens = dbKitchen.map((kitchen) => kitchen.get({ plain: true }));
        res.render('homepage', {
            kitchens,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
    
});
//RENDER Kitchen by ID
router.get('/kitchen/:id', async (req, res) => {
    try {
        // Get all Kitchens and JOIN with user, food and comment data
        const dbKitchen = await Kitchen.findAll({
            where: {
                id: req.params.id
            },
          include: [
              {
              model: Comments,
              attributes: ['id', 'rating', 'comment_body', 'created_at', 'user_id', 'kitchen_id'],
              include: [
                {
                  model: User,
                }
              ]
              },
              {
                  model: Food,
                  include: {
                      model: Kitchen
                  }
              },
              {
                  model: User,
                  exclude: ['password']
              }
          ]
        });

        const kitchens = dbKitchen.map((kitchen) => kitchen.get({ plain: true }));
        res.render('kitchenbyid', {
            kitchens,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
    
});
//RENDER LOGIN PAGE ROUTE
router.get('/login', (req, res) => {

    //if user is signed in redirect to homepage
    if(req.session.loggedIn) {
        res.redirect('/');
        return; 
    }
    res.render('login');
});
//RENDER SIGNUP PAGE ROUTE
router.get('/signup', (req, res) => {

    //if user is signed in redirect to homepage
    if(req.session.loggedIn) {
        res.redirect('/');
        return; 
    }
    res.render('signup');
});
//RENDER SEARCH PAGE
router.get('/search', (req, res) => {

    res.render('search');
});

//RENDER USER PROFILE
router.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        logged_in: req.session.logged_in
    });
    //add async
    // try {
    //     const id = req.session.user_id
    //     // Get all Kitchens and JOIN with user data
    //     const dbUser = await User.findByPk(id, {
    //         include: [
    //             {
    //                 model: Kitchen,
    //                 include: {
    //                     model: Food,
    //                 }
    //             },
    //             {
    //                 model: Comments,
    //             },
    //         ],

    //     });

    //     const users = dbUser.map((user) => user.get({ plain: true }));
    //     res.render('profile', {
    //         users,
    //         logged_in: req.session.logged_in
    //     });
    // } catch (err) {
    //     res.status(500).json(err);
    // }

});

//RENDER ORDER PAGE
router.get('/order', (req, res) => {

    res.render('order');
});

//RENDER USER REVIEWS
router.get('/reviews', (req, res) => {

    res.render('reviews');
});

//RENDER OPEN ORDERS
router.get('/orders', (req, res) => {

    res.render('orders');
});

module.exports = router; 
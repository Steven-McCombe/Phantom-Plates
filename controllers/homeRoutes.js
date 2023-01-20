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
            logged_in: req.session.logged_in,
            user_id: req.session.user_id
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

//RENDER DASHBOARD
router.get('/dashboard', async (req, res) => {
    try {
        // Get One User
        
        const dbKitchen = await Kitchen.findOne({
            where: {
                user_id: req.session.user_id
            },
        })
        let dbUser = null
        if (dbKitchen) {
            dbUser = await User.findAll({
                where: {
                    id: req.session.user_id,
                },
                attributes: {
                    exclude: ['password'],
                },
                include: [
                    {
                        model: Kitchen,
                        where: {
                            user_id: req.session.user_id
                        },
                        include: {
                            model: Food
                        }
                    },
                ],
            });
        } else { 
            dbUser = await User.findAll({
                where: {
                    id: req.session.user_id,
                },
                attributes: {
                    exclude: ['password'],
                },
            }); 
        }

        if (!dbUser) {
            res.redirect('/');
        }
        const users = dbUser.map((user) => user.get({ plain: true }));
        res.render('dashboard', {
            users,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }

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

//Render Edit Profile
router.get('/editprofile', (req, res) => {

    res.render('editprofile');
});

//Render Edit Food
router.get('/editfood', (req, res) => {

    res.render('editfood');
});

//Render Edit Kitchen
router.get('/editkitchen', (req, res) => {

    res.render('editkitchen');
});

//Render Add Kitchen
router.get('/addkitchen', (req, res) => {

    res.render('addkitchen');
});
//Render Edit Address
router.get('/editAddress', (req, res) => {

    res.render('editAddress');
});



module.exports = router; 
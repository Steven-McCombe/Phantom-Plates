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
        const dbAddress = await Address.findOne({
            where: {
                user_id: req.session.user_id
            },
        })
        console.log("this is dbAddresses" + dbAddress)
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
            console.log("this is dbKitchen" + dbKitchen)
        } else {
            dbUser = await User.findAll({
                where: {
                    id: req.session.user_id,
                },
                attributes: {
                    exclude: ['password'],
                },
            });
            console.log("this is dbUser" + dbUser)
        }
        if (!dbUser) {
            res.redirect('/');
        }
        const users = dbUser.map((user) => user.get({ plain: true }));
        let addresses = null

        if (dbAddress) { 
            addresses = dbAddress.get({plain: true})
        }

        console.log("this is addresses" + addresses)
        console.log("this is users " + users)
        res.render('dashboard', {
            users,
            addresses,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
                                
//RENDER ORDER PAGE
router.get('/order', (req, res) => {

    res.render('order', {
    logged_in: req.session.logged_in});
});

//RENDER USER REVIEWS
router.get('/reviews', (req, res) => {

    res.render('reviews', {
        logged_in: req.session.logged_in});
});

//RENDER OPEN ORDERS
router.get('/orders', (req, res) => {

    res.render('orders', {
        logged_in: req.session.logged_in});
});

//Render Edit Profile
router.get('/editprofile', (req, res) => {

    res.render('editprofile', {
        logged_in: req.session.logged_in});
});

//Render Add food Food
router.get('/addfood', withAuth, async (req, res) => {
    const dbKitchen = await Kitchen.findOne({
        where: {
            user_id: req.session.user_id
        },
    })
    if (dbKitchen) { 
        kitchen = dbKitchen.get({plain: true})
    }
    res.render('addfood', {
        kitchen,
        logged_in: req.session.logged_in});
});
// Render Edit food
router.get('/editfood/:id', withAuth, async (req, res) => {
    const dbFood = await Food.findOne({
        where: {
            id: req.params.id
        },
    })
    if (dbFood) { 
        food = dbFood.get({plain: true})
    }
    res.render('editfood', {
        food,
        logged_in: req.session.logged_in});
});



//Render Add Kitchen
router.get('/addkitchen', (req, res) => {

    res.render('addkitchen', {
        logged_in: req.session.logged_in});
});
//Render Add Address
router.get('/addaddress', (req, res) => {

    res.render('addaddress', {
        logged_in: req.session.logged_in});
});



module.exports = router; 
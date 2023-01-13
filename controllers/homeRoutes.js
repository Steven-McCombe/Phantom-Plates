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
                    model: Comments,
                    attributes: ['comment_body', 'rating'],
                },
            ],
            order: [['created_at', 'DESC']],
        });

        const kitchens = dbKitchen.map((kitchen) => kitchen.get({ plain: true }));
        console.log(kitchens)
        res.render('homepage', {
            kitchens,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router; 
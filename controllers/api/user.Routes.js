const router = require('express').Router();
const { Comments, Food, Kitchen, User, Address } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
const { where } = require('sequelize');



// Get all users
router.get('/', async (req, res) => {
    try {
        const dbUser = await User.findAll({
            attributes: ['id', 'name', 'email', 'password', 'bio', 'created_at', 'role', 'role', 'image_url'],
            include: [
                {
                    model: Reviews,
                    attributes: ['review_text', 'ratings'],
                    
                },
                {
                    model: Kitchen,
                    attributes: ['kitchen_name', 'location']
                },
            ],
            order: [['created_at', 'DESC']],

        });
        res.json(dbUser)
    } catch (err) {
        res.status(500).json(err)
    }
});

// Get a user by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const dbUser = await User.findByPk(id, {
            attributes: ['id', 'name', 'email', 'password', 'bio', 'created_at', 'role', 'image_url'],
            include: [
                {
                    model: Kitchen,
                    attributes: ['kitchen_name', 'location'],
                    
                },
                {
                    model: Reviews,
                    attributes: ['ratings']
                },
            ],
            order: [['created_at', 'DESC']],

        });

        if (!dbUser) {
            return res.status(404).json({ message: 'user not found.' });
        }
        res.json(dbUser);
    } catch (err) {
        res.status(400).json(err);
    }
});


// Create a new comment
//TODO Add withAuth, ('/', withAuth, async back after testing to ensure only signed in users can

router.post('/', async (req, res) => {
        try {
        const dbUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password, 
            allergies: req.body.allergies,
            bio: req.body.bio,
            role: req.body.role,
            image_url: req.body.image_url,
        });
        res.json(dbUser);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Edit comment request
//TODO Add withAuth ('/', withAuth, async back after testing to ensure only users who created the comment can edit
router.put('/:id', async (req, res) => {
    try {
        const dbUser = await User.update(
            {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                allergies: req.body.allergies,
                bio: req.body.bio,
                role: req.body.role,
                image_url: req.body.image_url,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        res.json(dbUser);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//TODO Add withAuth ('/', withAuth, async back after testing to ensure only users who created the comment can edit
router.delete('/:id', async (req, res) => {
    try {
        const dbUser = await User.destroy({
            where: {
                id: req.params.id,
                // user_id: req.session.user_id //!Add this in when live.
            },
        });
        res.json(dbUser);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
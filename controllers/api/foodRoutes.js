
const router = require('express').Router();
const { Comments, Food, Kitchen, User } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
const { where } = require('sequelize');

// Create a new Food
router.post('/', async (req, res) => {
    try {
        const dbFood = await Food.create ({  
        kitchen_id: req.body.kitchen_id,
        food_name: req.body.food_name,
        description: req.body.description,
        ingredients: req.body.ingredients,
        price: req.body.price,
        image_url: req.body_url,
        })
        res.json(dbFood);
    } catch (err) {
        res.status(400).json(err);
    }
});
router.put('/', async (req, res) => {
    try {
    const dbFood = await Food.update({
    food_name: req.body.food_name,
    description: req.body.description,
    ingredients: req.body.ingredients,
    price: req.body.price,
    image_url: req.body.image_url,
    },
    {
    where: {
    id: req.body.id
    }
    });
    res.json(dbFood);
    } catch (err) {
    res.status(400).json(err);
    }
    });
    
// Get all Food
router.get('/', async (req, res) => {
    try {
        const dbFood = await Food.findAll({
            attributes: ['id', 'kitchen_id', 'food_name', 'description', 'price', 'created_at','image_url'],
            include: [
                {
                    model: Kitchen,
                    attributes: ['cuisine', 'location', 'available', 'kitchen_name']
                     
                },

            ],
            order: [['created_at', 'DESC']],

        });
        res.json(dbFood)
    } catch (err) {
        res.status(500).json(err)
    }
});

// Get a food by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const dbFood = await Food.findByPk(id, {
            attributes: ['id', 'kitchen_id', 'food_name', 'description','ingredients', 'price', 'created_at', 'image_url'],
            
            order: [['created_at', 'DESC']],

        });

        if (!dbFood) {
            return res.status(404).json({ message: 'Food not found.' });
        }
        res.json(dbFood);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
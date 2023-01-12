const router = require('express').Router();

// const userRoutes = require('./userRoutes.js');
const commentRoutes = require('./commentRoutes.js');
const kitchenRoutes = require('./kitchenRoutes.js');
const foodRoutes = require('./foodRoutes.js');
const addressRoutes = require('./addressRoutes')
const userRoutes = require('./userRoutes')

router.use('/user', userRoutes);
router.use('/kitchen', kitchenRoutes);
router.use('/comment', commentRoutes);
router.use('/food', foodRoutes);
router.use('/address', addressRoutes);

module.exports = router;

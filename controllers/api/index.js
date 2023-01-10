const router = require('express').Router();

// const userRoutes = require('./userRoutes.js');
const commentRoutes = require('./commentRoutes.js');
// const kitchenRoutes = require('./kitchenRoutes.js');
// const foodRoutes = require('./foodRoutes.js');

// router.use('/users', userRoutes);
// router.use('/kitchen', kitchenRoutes);
router.use('/comment', commentRoutes);
// router.use('/food', foodRoutes);

module.exports = router;

const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes');
const commentRoutes = require('./commentRoutes');
const upvoteRoutes = require('./upvoteRoutes');

router.use('/users', userRoutes);
router.use('/blog', blogRoutes);
router.use('/comments', commentRoutes);
router.use('/upvotes', upvoteRoutes);

module.exports = router;

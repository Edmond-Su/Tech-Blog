const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes')

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.user('/comment', commentRoutes);

module.exports = router;
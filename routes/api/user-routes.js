const router = require('express').Router();
const { Comment, Blog, User } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            include: [Comment, Blog]
        });
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});
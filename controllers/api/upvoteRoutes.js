const router = require('express').Router();
const { Upvotes } = require('../../models');
const withAuth = require('../../utils/auth');

// /blog/1/upvotes
router.get("/:blogId", async (req, res) => {
    try {
        const likeData = await Upvotes.findAll({
            where: {
                postId: req.body.blogId,
            }
        });
        res.status(200).json(likeData);
    } catch (err) {
        res.status(400).json(err)
    }

})


router.get('/', async (req, res) => {
    try {
        const likeData = await Upvotes.findAll({
            where: {
                // like_count: res.session.user_id,
                postId: req.params.id,
                user_id: req.session.user_id,
            }
        });
        res.status(200).json(likeData);
    } catch (err) {
        res.status(400).json(err)
    }
});

router.get('/', async (req, res) => {
    try {
        const dislikeData = await Upvotes.findAll({
            where: {
                // dislike_count: res.session.user_id,
                postId: req.params.id,
                user_id: req.session.user_id,
            }
        });
        res.status(200).json(dislikeData);
    } catch (err) {
        res.status(400).json(err)
    }
});

router.put('/:blogId', withAuth, async (req, res) => {
    try {
        const newUpvotes = await Upvotes.create({
            ...req.body, 
            user_id: req.session.user_id,
            postId: req.params.id,
        })
        res.status(200).json(newUpvotes);
    } catch (err) {
        res.status(400).json(err)
    }
});

router.put('/', withAuth, async (req, res) => {
    try {
        const dislikeData = await Upvotes.findAll({
            where: {
                dislike_count: res.session.user_id,
                postId: req.params.id,
                user_id: req.session.user_id,
            }
        });
        res.status(200).json(dislikeData);
    } catch (err) {
        res.status(400).json(err)
    }
});

module.exports = router;
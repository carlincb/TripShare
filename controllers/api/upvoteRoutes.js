const router = require('express').Router();
const { Upvotes, Blog, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const upvoteData = await Upvotes.findAll({
      include: [{
        model: User,
        attributes: {exclude: ['password']}
      },
       Blog]
    });
    res.status(200).json(upvoteData);
  } catch (err) {
    res.status(400).json(err)
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newUpvote = await Upvotes.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newUpvote);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
      const newUpvotes = await Upvotes.update(req.body, {
        where: {
          id: req.params.id
        }
      });
      res.status(200).json(newUpvotes);
  } catch (err) {
      res.status(400).json(err)
  }
});

module.exports = router;
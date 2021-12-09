const router = require('express').Router();
const { route } = require('.');
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const editBlog = await Blog.update(
      {
        ...req.body,
        user_id: req.session.user_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json(editBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// fetch /blog/1/upvotes
router.get('/:id/upvotes', withAuth, async (req, res) => {
  try {
    const upvoteData = await Upvotes.findAll({
      where: {
        postId: req.params.id,
        // user_id: req.session.user_id,
      },
    });
    res.status(200).json(upvoteData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// create an upvote for this blogpost
// this is what the event listener on upvote click is going to call
router.post('/:id/upvotes', withAuth, async (req, res) => {
  // this is where you do Upvotes.create()
  try {
    const newUpvote = await Upvotes.create({
      postId: req.params.id,
      user_id: req.session.user_id,
    });
    res.status(200).json(newUpvote);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

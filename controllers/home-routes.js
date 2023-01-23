const router = require('express').Router();
const { User, Post, Comment } = require('../models/');
const withAuth = require('../utils/auth');

// get all posts for homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User]
    });
        const posts = postData.map((post) => post.get({ plain: true }));
      res.render('homepage', {
        posts,
      loggedIn: req.session.loggedIn
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

router.get('/post', (req, res) => {
  res.render('create-post')
})

router.get('/comment', (req, res) => {
  res.render('add-comment')
})

module.exports = router;
const router = require('express').Router();
const { User, Post, Comment } = require('../models/');
const withAuth = require('../utils/auth');

// get all posts for homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }, { model: Comment }]
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
      username: req.session.username
    })
  } catch (err) {
    res.status(500).json(err);
  }
});
// ROUTE FOR LOGIN
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login', {
    layout: 'main'
  });
});
// ROUTE FOR SIGNUP
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup', {
    layout: 'main'
  });
});
// ROUTER FOR CREATE POST
router.get('/post', (req, res) => {
  res.render('create-post')
});
// ROUTER FOR FINDING POST BY ID
router.get('/post/:id', (req, res) => {
  Post.findByPk(req.params.id, {
    include: [User, { model: Comment, include: [User] }],
    where: {
      post_id: req.params.id
    }
  }).then(postData => {
    let post = postData.get({ plain: true })
    res.render('singlepost', {
      layout: 'main',
      post,
      loggedIn: req.session.loggedIn,
      username: req.session.username
    })
  }).catch(err => res.status(500).json(err))
})

module.exports = router;
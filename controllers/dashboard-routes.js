const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// ROUTER TO GET ALL POSTS ON DASHBOARD
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }, { model: Comment }],
      where: {
        user_id: req.session.userId
      },
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('dashboard-admin', {
      layout: 'dashboard',
      posts,
      loggedIn: req.session.loggedIn,
      username: req.session.username
    })
  } catch (err) {
    res.status(500).json(err);
  }
});
// ROUTER TO GET EDIT POST BY ID ON DASHBOARD
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    if (postData) {
      const post = postData.get({ plain: true });
      res.render('mutation-post', {
        layout: 'dashboard',
        post,
        loggedIn: req.session.loggedIn,
        username: req.session.username
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});
// ROUTER TO CREATE A COMMENT ON DASHBOARD
router.get('/add/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    if (postData) {
      const post = postData.get({ plain: true });
      res.render('add-comment', {
        layout: 'main',
        post,
        loggedIn: req.session.loggedIn,
        username: req.session.username
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;
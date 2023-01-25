const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

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
      loggedIn: req.session.loggedIn
    })
  } catch (err) {
      res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User }, { model: Comment }]
    });
        const posts = postData.map((post) => post.get({ plain: true }));
      res.render('dashboard', {
        layout: 'mutation-post',
        posts,
        loggedIn: true
    })
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
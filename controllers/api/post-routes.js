const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
// ROUTER TO GET ALL POSTS
router.get('/', withAuth, async (req, res) => {
    try {
       const postData = await Post.findAll({ 
            include: [{ model: User }, { model: Comment }],
        });
        const posts = postData.map((post) =>
            post.get({ plain: true })
        );
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
// ROUTER TO GET POST BY ID
router.get('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User }, { model: Comment }],
        });
        const posts = postData.map((post) =>
        post.get({ plain: true })
    );
        res.render('singlepost', {
            layout: 'dashboard',
            posts,
            loggedIn: req.session.loggedIn,
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});
// ROUTER TO CREATE A POST
router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            title:req.body.title,
            content:req.body.content,
            user_id:req.session.userId
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});
// ROUTER TO UPDATE A POST BY ID
router.put('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!postData) {
            res.status(404).json({ message: 'No Post found with that id!'});
            return;
        };
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});
// ROUTER TO DELETE A POST BY ID
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.destroy({ where: { id: req.params.id }});
      res.json(postData);
      res.render('dashboard')
    } catch (err) {
      console.error(err);
      res.json(err);
    }
  });

module.exports = router;
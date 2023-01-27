const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
// ROUTER TO GET ALL COMMENTS
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [{ model: User }, { model: Post }],
        });
        // res.status(200).json(commentData);
        const comments = commentData.map((comment) => comment.get({ plain: true })
        );
        res.render('view-comment', {
            layout: 'dashboard',
            comments,
            loggedIn: req.session.loggedIn,
            username: req.session.username
        })
    } catch (err) {
        res.status(500).json(err);
    }
});
// ROUTER TO GET COMMENT BY ID
router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id, {
            include: [{ model: User }, { model: Post }],
            where: {
                post_id: req.params.id
            },
        });
        const comments = commentData.map((comment) => comment.get({ plain: true })
        );
        res.render('view-comment', {
            layout: 'dashboard',
            comments,
            loggedIn: req.session.loggedIn,
            username: req.session.username
        })
    } catch (err) {
        res.status(500).json(err);
    }
});
// ROUTER TO CREATE A NEW COMMENT
router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create({
            comment_content: req.body.comment_content,
            user_id: req.session.userId,
            post_id: req.body.post_id,
            username: req.session.username
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});
// ROUTER TO UPDATE A COMMENT
router.put('/:id', async (req, res) => {
    try {
        const commentData = await Comment.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});
// ROUTER TO DELETE A COMMENT
router.delete('/:id', async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    } 
});

module.exports = router;
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [{ model: User }, { model: Post }],
        });
        res.status(200).json(commentData);
        // const comments = commentData.map((comment) => comment.get({ plain: true })
        // );
        // res.render('homepage', {
        //     comments,
        //     loggedIn: req.session.loggedIn,
        // })
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id, {
            include: [{ model: User }, { model: Post }],
        });
        if (!commentData) {
            res.status(404).json({ message: 'No Comment found with that id!'});
            return;
        };
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    res.render('add-comment');
    try {
        const commentData = await Comment.create({
            comment_content: req.body.comment_content,
            user_id: req.body.userId,
            post_id: req.body.post_id,
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

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
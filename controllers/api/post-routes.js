const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
       const postData = await Post.findAll({ 
            include: [{ model: User }, { model: Comment }],
        });
        res.status(200).json(postData)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('./:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User }, { model: Comment }],
        });
        if (!postData) {
            res.status(404).json({ message: 'No Post found with that id!'});
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const postData = await Post.create({
            title:req.body.title,
            content:req.body.content,
            userId:req.session.user.id
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('./:id', async (req, res) => {
    try {
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('./:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
            },
        })
    } catch (err) {
        res.status(500).json(err);
    } 
});

module.exports = router;
const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('./:id', async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('./:id', async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('./:id', async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json(err);
    } 
});

module.exports = router;
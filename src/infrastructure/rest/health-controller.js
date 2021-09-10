const express = require('express');
const router = express.Router();

const { server: { port } } = require('../config/');

router.get('/', async (req, res) => {
    try {
        res.status(200).send(`OK ${port}`)
    } catch (error) {
        res.status(500).send("FAIL")
    }
})

module.exports = router;

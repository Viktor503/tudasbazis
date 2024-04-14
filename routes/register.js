const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    res.render('register', {"title": "Regisztráció"});
});

module.exports = router; 
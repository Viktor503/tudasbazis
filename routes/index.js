const express = require('express');
const router = express.Router();
const {verifyToken} = require('../config/auth');

router.get('/', async (req, res) => {
    var user = {};
    verifyToken(req, res, () => {
        if(req.user)
            user = req.user;
    });
    console.log(user);
    res.render('index', {"title": "Kezdőoldal", user: user});
});

module.exports = router; 
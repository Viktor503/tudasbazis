const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    res.render('login', {"title": "Bejelentkezés"});
});

router.post('/', async (req, res) => {
    console.log(req.body);
    res.redirect("/");
});

module.exports = router; 
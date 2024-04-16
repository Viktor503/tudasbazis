const express = require('express');
const router = express.Router();
  
router.get('/', (req, res) => {
    res.render('index', {"title": "Kezdőoldal", user: req.user});
});

module.exports = router; 
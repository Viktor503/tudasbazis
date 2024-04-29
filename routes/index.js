const express = require('express');
const router = express.Router();
const CikkDAO = require('../dao/cikkDAO');
  
router.get('/', async (req, res) => {
    const cikkek = new CikkDAO(req.conn);
    const legutobbiCikkek = await cikkek.getLastThree();
    
    res.render('index', {"title": "Kezdőoldal", legutobbiCikkek, user: req.user});
});

module.exports = router; 
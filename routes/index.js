const express = require('express');
const router = express.Router();
const CikkDAO = require('../dao/cikkDAO');
  
router.get('/', async (req, res) => {
    const cikkek = new CikkDAO(req.conn);
    const legutobbiCikkek = await cikkek.getLastThree();
    const nyelv = await cikkek.nyelvSzerint();
    console.log(nyelv);
    res.render('index', {"title": "Kezdőoldal", legutobbiCikkek, nyelv,user: req.user});
});

module.exports = router; 
const express = require('express');
const router = express.Router();
const CikkDAO = require('../dao/cikkDAO');
const LektorDAO = require('../dao/lektorDAO');
  
router.get('/', async (req, res) => {
    const cikkek = new CikkDAO(req.conn);
    const lektorok = new LektorDAO(req.conn);
    const legutobbiCikkek = await cikkek.getLastThree();

    const nyelv = await cikkek.nyelvSzerint();
    const szakteruletek = await lektorok.getSzakteruletAmount();
    const atlagModositasFelettiCikkek = await cikkek.getAtlagModositasFelettiCikkek();
    res.render('index', {"title": "Kezdőoldal", legutobbiCikkek, nyelv,user: req.user, szakteruletek, atlagModositasFelettiCikkek});

});

module.exports = router; 


// cikk módosítások száma
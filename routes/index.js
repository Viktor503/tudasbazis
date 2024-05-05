const express = require('express');
const router = express.Router();
const CikkDAO = require('../dao/cikkDAO');
const LektorDAO = require('../dao/lektorDAO');
const FelhasznaloDAO = require('../dao/felhasznaloDAO');
  
router.get('/', async (req, res) => {
    const cikkek = new CikkDAO(req.conn);
    const lektorok = new LektorDAO(req.conn);
    const legutobbiCikkek = await cikkek.getLastThree();

    const nyelv = await cikkek.nyelvSzerint();
    const szakteruletek = await lektorok.getSzakteruletAmount();
    const atlagModositasFelettiCikkek = await cikkek.getAtlagModositasFelettiCikkek();
    const felhasznalok = new FelhasznaloDAO(req.conn);
    const mostModifiedSzerzo = await felhasznalok.getMostModifiedSzerzo(); 

    res.render('index', {"title": "Kezdőoldal", legutobbiCikkek, nyelv,user: req.user, szakteruletek, mostModifiedSzerzo,  atlagModositasFelettiCikkek});

});

module.exports = router; 


// cikk módosítások száma
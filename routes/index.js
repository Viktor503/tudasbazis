const express = require('express');
const router = express.Router();
const cikkDAO = require('../dao/cikkDAO');
const kulcsszoDAO = require('../dao/kulcsszoDAO');
const lektorDAO = require('../dao/lektorDAO');
const nyelvDAO = require('../dao/nyelvDAO');

  
router.get('/', (req, res) => {
    res.render('index', {"title": "Kezdőoldal", user: req.user});
});

router.get('/cikkek', async (req, res) => {
    const cikk = new cikkDAO(req.conn);
    const cikkek = await cikk.getAll();
    res.render('list', {"title": "Cikkek", data : cikkek});
});

router.get('/kulcsszavak', async (req, res) => {
    const kulcsszo = new kulcsszoDAO(req.conn);
    const kulcsszavak = await kulcsszo.getAll();
    res.render('list', {"title": "Kulcsszavak", data : kulcsszavak});
});

router.get('/lektorok', async (req, res) => {
    const lektor = new lektorDAO(req.conn);
    const lektorok = await lektor.getAll();
    res.render('list', {"title": "Lektorok", data : lektorok});
});

router.get('/nyelvek', async (req, res) => {
    const nyelv = new nyelvDAO(req.conn);
    const nyelvek = await nyelv.getAll();
    res.render('list', {"title": "Nyelvek", data : nyelvek});
});

module.exports = router; 
const express = require('express');
const router = express.Router();
const kulcsszoDAO = require('../dao/kulcsszoDAO');
const lektorDAO = require('../dao/lektorDAO');
const nyelvDAO = require('../dao/nyelvDAO');
  
router.get('/', (req, res) => {
    res.render('index', {"title": "Kezdőoldal", user: req.user});
});

router.get('/kulcsszavak', async (req, res) => {
    const kulcsszo = new kulcsszoDAO(req.conn);
    const kulcsszavak = await kulcsszo.getAll();
    res.render('list', {"title": "Kulcsszavak", data : kulcsszavak,user: req.user});
});

router.get('/lektorok', async (req, res) => {
    const lektor = new lektorDAO(req.conn);
    const lektorok = await lektor.getAll();
    res.render('list', {"title": "Lektorok", data : lektorok,user: req.user});
});

router.get('/nyelvek', async (req, res) => {
    const nyelv = new nyelvDAO(req.conn);
    const nyelvek = await nyelv.getAll();
    res.render('list', {"title": "Nyelvek", data : nyelvek,user: req.user});
});

module.exports = router; 
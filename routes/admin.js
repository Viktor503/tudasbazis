const express = require('express');
const router = express.Router();
const cikkDAO = require('../dao/cikkDAO');
const felhasznaloDAO = require('../dao/felhasznaloDAO');
const kulcsszoDAO = require('../dao/kulcsszoDAO');
const lektorDAO = require('../dao/lektorDAO');
const nyelvDAO = require('../dao/nyelvDAO');

router.get('/', async (req, res) => {
    res.render('admin', {"title": "Admin"});
});

router.get('/cikkek', async (req, res) => {
    const cikk = new cikkDAO(req.conn);
    const cikkek = await cikk.getAll();
    res.render('adminList', {"title": "Cikkek", data : cikkek});
});

router.get('/felhasznalok', async (req, res) => {
    const felhasznalo = new felhasznaloDAO(req.conn);
    const felhasznalok = await felhasznalo.getAll();
    res.render('adminList', {"title": "Felhasználók", data : felhasznalok});
});

router.get('/kulcsszavak', async (req, res) => {
    const kulcsszo = new kulcsszoDAO(req.conn);
    const kulcsszavak = await kulcsszo.getAll();
    res.render('adminList', {"title": "Kulcsszavak", data : kulcsszavak});
});

router.get('/lektorok', async (req, res) => {
    const lektor = new lektorDAO(req.conn);
    const lektorok = await lektor.getAll();
    res.render('adminList', {"title": "Lektorok", data : lektorok});
});

router.get('/nyelvek', async (req, res) => {
    const nyelv = new nyelvDAO(req.conn);
    const nyelvek = await nyelv.getAll();
    res.render('adminList', {"title": "Nyelvek", data : nyelvek});
});

module.exports = router;
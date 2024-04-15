const express = require('express');
const router = express.Router();
const cikkDAO = require('../dao/cikkDAO');
const nyelvDAO = require('../dao/nyelvDAO');
const kulcsszoDAO = require('../dao/kulcsszoDAO');

router.get('/', async (req, res) => {
    const cikk = new cikkDAO(req.conn);
    const cikkek = await cikk.getAll();
    res.render('list', {"title": "Cikkek", data : cikkek, user: req.user});
});

router.get('/uj', async (req, res) => {
    const nyelv = new nyelvDAO(req.conn);
    const nyelvek = await nyelv.getAll();

    const kulcsszo = new kulcsszoDAO(req.conn);
    const kulcsszavak = await kulcsszo.getAll();
    res.render('ujcikk', {"title": "Új cikk", nyelvek, kulcsszavak, user: req.user});
});

router.post('/uj', async (req, res) => {
    const cikk = new cikkDAO(req.conn);
    await cikk.insertCikk(req.body.cim, req.user.azon, req.body.szoveg);
    res.redirect("/cikkek");
});

router.get('/:azon', async (req, res) => {
    const cikk = new cikkDAO(req.conn);
    const cikkAdat = await cikk.getByAzon(req.params.azon);
    res.render('cikk', {"title": cikkAdat.CIM, data : cikkAdat,user: req.user});
});

module.exports = router;
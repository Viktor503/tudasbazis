const express = require('express');
const router = express.Router();
const CikkDAO = require('../dao/cikkDAO');
const nyelvDAO = require('../dao/nyelvDAO');
const kulcsszoDAO = require('../dao/kulcsszoDAO');

router.get('/', async (req, res) => {
    const cikkDAO = new CikkDAO(req.conn);
    const cikkek = await cikkDAO.getAll();
    res.render('cikklista', {"title": "Cikkek", cikkek, user: req.user});
});

router.get('/uj', async (req, res) => {
    const nyelv = new nyelvDAO(req.conn);
    const nyelvek = await nyelv.getAll();

    const kulcsszo = new kulcsszoDAO(req.conn);
    const kulcsszavak = await kulcsszo.getAll();
    res.render('ujcikk', {"title": "Új cikk", nyelvek, kulcsszavak, user: req.user});
});

router.post('/uj', async (req, res) => {
    const cikk = new CikkDAO(req.conn);
    await cikk.insertCikk(req.body.cim, req.user.azon, req.body.szoveg);
    res.redirect("/cikkek");
});

router.get('/:azon', async (req, res) => {
    const cikkDAO = new CikkDAO(req.conn);
    const cikk = await cikkDAO.getByAzon(req.params.azon);
    if (!cikk) {
        res.status(404).send("404 Not Found");
        return;
    }
    res.render('cikk', {"title": cikk.CIM, cikk ,user: req.user});
});

module.exports = router;
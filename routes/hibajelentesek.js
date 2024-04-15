const express = require('express');
const router = express.Router();
const cikkDAO = require('../dao/cikkDAO');
const nyelvDAO = require('../dao/nyelvDAO');
const kulcsszoDAO = require('../dao/kulcsszoDAO');
const hibajelentesDAO = require('../dao/hibajelentesDAO');

router.get('/', async (req, res) => {
    const hibajelentes = new hibajelentesDAO(req.conn);
    const hibajelentesek = await hibajelentes.getAll();
    res.render('list', {"title": "Hibajelentések", data : hibajelentesek, user: req.user});
});

router.get('/uj', async (req, res) => {
    const hibajelentes = new hibajelentesDAO(req.conn);
    const hibajelentesek = await hibajelentes.getAll();

    const cikk = new cikkDAO(req.conn);
    const cikkek = await cikk.getAll();
    res.render('ujhibajelentes', {"title": "Új hiba jelentése", hibajelentesek, cikkek, user: req.user});
});

router.post('/uj', async (req, res) => {
    const hibajelentes = new hibajelentesDAO(req.conn);
    await hibajelentes.insertHibabejelentes(req.user.azon, Number(req.body.cikk), new Date(Date.now()), req.body.leiras);
    res.redirect("/hibajelentesek");
});

router.get('/:azon', async (req, res) => {
    const hibajelentes = new hibajelentesDAO(req.conn);
    if (!hibajelentes) {
        res.status(404).send('404 Not Found');
        return;
    }
    const hibajelentesAdat = await hibajelentes.getByAzon(req.params.azon);
    res.render('hibajelentes', {"title": hibajelentes.AZON, data : hibajelentesAdat, user: req.user});
});

module.exports = router;
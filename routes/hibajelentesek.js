const express = require('express');
const router = express.Router();
const CikkDAO = require('../dao/cikkDAO');
const HibajelentesDAO = require('../dao/hibajelentesDAO');

router.get('/', async (req, res) => {
    if (!req.user) {
        res.sendStatus(403);
        return;
    }
    const hibajelentes = new HibajelentesDAO(req.conn);
    const hibak = await hibajelentes.getAll();
    const cikk = new CikkDAO(req.conn);
    const cikkek = await cikk.getAll();
    res.render('hibabejelenteslista', {"title": "Hibajelentések", hibak, cikkek, user: req.user});
});

router.get('/uj', async (req, res) => {
    if (!req.user) {
        res.sendStatus(403);
        return;
    }
    const hibajelentes = new HibajelentesDAO(req.conn);
    const hibajelentesek = await hibajelentes.getAll();

    const cikk = new CikkDAO(req.conn);
    const cikkek = await cikk.getAll();
    res.render('ujhibajelentes', {"title": "Új hiba jelentése", hibajelentesek, cikkek, user: req.user});
});

router.post('/uj', async (req, res) => {
    if (!req.user) {
        res.sendStatus(403);
        return;
    }
    const hibajelentes = new HibajelentesDAO(req.conn);
    const hibajelentesek = await hibajelentes.getAll();

    const cikk = new cikkDAO(req.conn);
    const cikkek = await cikk.getAll();
    if(req.body.leiras.length < 10){
        res.render('ujhibajelentes', {"title": "Új hiba jelentése", hibajelentesek, cikkek, user: req.user, "error": "A leírásnak legalább 10 karakter hosszúnak kell lennie"});
        return;     
    }
    await hibajelentes.insertHibajelentes(req.user.azon, Number(req.body.cikk), new Date(Date.now()), req.body.leiras);
    res.redirect("/hibajelentesek");
});

router.get('/:azon', async (req, res) => {
    if (!req.user) {
        res.sendStatus(403);
        return;
    }
    const hibajelentesDAO = new HibajelentesDAO(req.conn);
    const hibajelentes = await hibajelentesDAO.getByAzon(req.params.azon);
    const cikkDAO = new CikkDAO(req.conn);
    const cikk = await cikkDAO.getByAzon(hibajelentes.CIKKAZON);
    if (!hibajelentes) {
        res.status(404).send("404 Not Found");
        return;
    }
    res.render('hibajelentes', {"title": "Hibajelentés: " + cikk.CIM, hibajelentes, cikk, user: req.user});
});

module.exports = router;
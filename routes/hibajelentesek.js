const express = require('express');
const router = express.Router();
const cikkDAO = require('../dao/cikkDAO');
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
    const hibajelentesek = await hibajelentes.getAll();

    const cikk = new cikkDAO(req.conn);
    const cikkek = await cikk.getAll();
    if(req.body.leiras.length < 10){
        res.render('ujhibajelentes', {"title": "Új hiba jelentése", hibajelentesek, cikkek, user: req.user, "error": "A leírásnak legalább 10 karakter hosszúnak kell lennie"});
        return;     
    }
    await hibajelentes.insertHibabejelentes(req.user.azon, Number(req.body.cikk), new Date(Date.now()), req.body.leiras);
    res.redirect("/hibajelentesek");
});

router.get('/:azon', async (req, res) => {
    const hibajelentesek = new hibajelentesDAO(req.conn);
    const cikkek = new cikkDAO(req.conn);
    const hibajelentes = await hibajelentesek.getByAzon(req.params.azon);
    const cikk = await cikkek.getByAzon(req.params.azon);
    if (!hibajelentes) {
        res.status(404).send("404 Not Found");
        return;
    }
    res.render('hibajelentes', {"title": "Hibajelentés: " + cikk.CIM, hibajelentes, cikk, user: req.user});
});

module.exports = router;
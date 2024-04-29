const express = require('express');
const router = express.Router();
const CikkDAO = require('../dao/cikkDAO');
const nyelvDAO = require('../dao/nyelvDAO');
const kulcsszoDAO = require('../dao/kulcsszoDAO');
const FelhasznaloDAO = require('../dao/felhasznaloDAO');

router.get('/', async (req, res) => {
    const cikkDAO = new CikkDAO(req.conn);
    const cikkek = await cikkDAO.getAll();
    res.render('cikklista', {"title": "Cikkek", cikkek, user: req.user, edit: false});
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
    const nyelv = new nyelvDAO(req.conn);
    const nyelvek = await nyelv.getAll();

    const kulcsszo = new kulcsszoDAO(req.conn);
    const kulcsszavak = await kulcsszo.getAll();
    if(req.body.cim.length < 5){
        res.render('ujcikk', {"title": "Új cikk", nyelvek, kulcsszavak, user: req.user, "error": "A címnek legalább 5 karakter hosszúnak kell lennie"});
        return;     
    }
    if(req.body.szoveg.length < 20){
        res.render('ujcikk', {"title": "Új cikk", nyelvek, kulcsszavak, user: req.user, "error": "A cikknek legalább 20 karakter hosszúnak kell lennie"});
        return;
    }

    await cikk.insertCikk(req.body.cim, req.user.azon, req.body.szoveg);
    res.redirect("/cikkek");
});

router.get('/:azon', async (req, res) => {
    const cikkDAO = new CikkDAO(req.conn);
    const cikk = await cikkDAO.getByAzon(req.params.azon);
    const felhasznaloDAO = new FelhasznaloDAO(req.conn);
    let szerzo = (await felhasznaloDAO.getByAzon(cikk?.SZERZOAZON))?.NEV;
    if (!szerzo) {
        szerzo = "Ismeretlen";
    }
    if (!cikk) {
        res.status(404).send("404 Not Found");
        return;
    }
    res.render('cikk', {"title": cikk.CIM, cikk, szerzo, user: req.user, edit: false });
});

router.get('/:azon/edit', async (req, res) => {
    const cikkDAO = new CikkDAO(req.conn);
    const cikk = await cikkDAO.getByAzon(req.params.azon);
       if (!cikk) {
        res.status(404).send("404 Not Found");
        return;
       }
    const felhasznaloDAO = new FelhasznaloDAO(req.conn);
    if (!req.user || (!req.user.admin && req.user.azon !== cikk.SZERZOAZON)) {
        res.status(403).send('Hozzáférés megtagadva (Ki a f*szom az az Edit?)');
        return;
    }
    let szerzo = await felhasznaloDAO.getByAzon(cikk.SZERZOAZON).NEV;
    if (!szerzo) {
        szerzo = "Ismeretlen";
    }
    res.render('cikk', {"title": cikk.CIM, cikk, szerzo, user: req.user, edit: true });
});

router.post('/:azon/edit', async (req, res) => {
    const cikkek = new CikkDAO(req.conn);
    const regiCikk = await cikkek.getByAzon(req.params.azon);
    if (req.body.azon && req.body.cim && req.body.tartalom && req.user && (req.user.azon === regiCikk.SZERZOAZON || req.user.admin)) {
        await cikkek.updateCikk(req.body.azon, req.body.cim, req.body.tartalom);
        // TODO: triggerrel növelni a módosítások számát
        res.redirect("/cikkek");
        return;
    }
    res.sendStatus(403);
});

router.delete('/:azon', async (req, res) => {
    const cikkDAO = new CikkDAO(req.conn);
    const torolni = await cikkDAO.getByAzon(req.params.azon);
    if (torolni !== undefined && req.user && (req.user.azon === torolni.SZERZOAZON || req.user.admin)) {
        await cikkDAO.deleteCikk(req.params.azon);
        res.sendStatus(200);
        return;
    }
    res.sendStatus(403);
});

module.exports = router;
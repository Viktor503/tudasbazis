const express = require('express');
const lektorDAO = require('../dao/lektorDAO');
const felhasznaloDAO = require('../dao/felhasznaloDAO');
const cikkDAO = require('../dao/cikkDAO');
const router = express.Router();
  
router.get('/', async (req, res) => {
    const lektorok = new lektorDAO(req.conn);
    const lektor = await lektorok.getByAzon(req.user.lektorAzon);
    res.render('fiokom', {"title": req.user.nev + " adatai", user: req.user, lektor, "error": null});
});

router.post('/updateFelhasznalo', async (req, res) => {
    const felhasznalok = new felhasznaloDAO(req.conn);
    const regiFelhasznalo = await felhasznalok.getByAzon(req.user.azon);
    if (req.body.jelszo !== req.body.jelszo2) {
        res.render('fiokom', {"title": req.user.nev + " adatai", user: req.user, lektor, "error": "A két jelszó nem egyezik meg!"});
    }
    if (req.body.jelszo.length < 8) {
        res.render('fiokom', {"title": req.user.nev + " adatai", user: req.user, lektor, "error": "A jelszó túl rövid!"});
    }
    await felhasznalok.updateFelhasznalo(req.user.azon, req.body.jelszo);
    res.redirect("/fiokom");
});

router.post('/updateLektor', async (req, res) => {
    const lektorok = new lektorDAO(req.conn);
    const regiLektor = await lektorok.getByAzon(req.user.lektorAzon);
    if (req.body.fokozat && req.body.intezet && req.body.szakterulet) {
        await lektorok.updateLektor(req.user.lektorAzon, req.body.fokozat, req.body.intezet, req.body.szakterulet);
    }
    res.redirect("/fiokom");
});

router.post('/cikkek/update/:azon', async (req, res) => {
    const cikkek = new cikkDAO(req.conn);
    const regiCikk = await cikkek.getByAzon(req.params.azon);
    if (req.body.azon && req.body.cim && req.body.tartalom && req.user && (req.user.azon === regiCikk.SZERZOAZON || req.user.admin)) {
        await cikkek.updateCikk(req.body.azon, req.body.cim, req.body.tartalom);
        // TODO: triggerrel növelni a módosítások számát
        res.redirect("/admin/cikkeke");
        return;
    }
    res.sendStatus(403);
});

module.exports = router; 
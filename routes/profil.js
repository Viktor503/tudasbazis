const express = require('express');
const lektorDAO = require('../dao/lektorDAO');
const felhasznaloDAO = require('../dao/felhasznaloDAO');
const router = express.Router();
  
router.get('/', async (req, res) => {
    if (!req.user) {
        res.redirect('/login');
    } else {
        res.redirect('/profil/' + req.user.nev);
    }
});

router.get('/:nev', async (req, res) => {
    const felhasznalok = new felhasznaloDAO(req.conn);
    const felhasznalo = await felhasznalok.getByNev(req.params.nev);
    if (!felhasznalo) {
        res.sendStatus(404, "404 Not Found");
        return;
    }
    const lektorok = new lektorDAO(req.conn);
    let lektor;
    if(felhasznalo.LEKTORAZON){
        lektor = await lektorok.getByAzon(felhasznalo.LEKTORAZON);
    }
    res.render('profil', {"title": felhasznalo.NEV + " adatai", user: req.user, felhasznalo, lektor, "error": null});
});

router.post('/:nev/updateFelhasznalo', async (req, res) => {
    if (!req.user) {
        res.sendStatus(403);
        return;
    }
    const felhasznalok = new felhasznaloDAO(req.conn);
    const regiFelhasznalo = await felhasznalok.getByAzon(req.user.azon);
    if (req.body.jelszo !== req.body.jelszo2) {
        res.render('profil', {"title": req.user.nev + " adatai", user: req.user, lektor, "error": "A két jelszó nem egyezik meg!"});
    }
    if (req.body.jelszo.length < 8) {
        res.render('profil', {"title": req.user.nev + " adatai", user: req.user, lektor, "error": "A jelszó túl rövid!"});
    }
    await felhasznalok.updateFelhasznalo(req.user.azon, req.body.jelszo);
    res.redirect("/profil" + req.params.nev);
});

router.post('/:nev/updateLektor', async (req, res) => {
    if (!req.user) {
        res.sendStatus(403);
        return;
    }

    const lektorok = new lektorDAO(req.conn);
    const regiLektor = await lektorok.getByAzon(req.user.lektorAzon);
    console.log(req.body);
    if (req.body.fokozat && req.body.intezet && req.body.szakterulet) {
        await lektorok.updateLektor(req.body.azon, req.body.fokozat, req.body.intezet, req.body.szakterulet);
    }
    res.redirect("/profil" + req.params.nev);
});

router.post('/:nev/updateAdminLektor', async (req, res) => {
    if (!req.user) {
        res.sendStatus(403);
        return;
    }

    const felhasznalok = new felhasznaloDAO(req.conn);
    const felhasznalo = await felhasznalok.getByNev(req.params.nev);
    const lektorok = new lektorDAO(req.conn);
    let ujLektor = null;
    console.log(req.body) 
    if (req.body.fokozat && req.body.intezet && req.body.szakterulet) {
        if(req.body.azon == '') {
            if (req.body.lektor){
            await lektorok.insertLektor(req.body.fokozat, req.body.intezet, req.body.szakterulet);
            ujLektor = await lektorok.getLatestAzon();
            ujLektor = ujLektor['MAX(AZON)'];
            }
            await felhasznalok.updateFelhasznaloLektor(felhasznalo.AZON, ujLektor);
            await felhasznalok.updateFelhasznaloAdmin(felhasznalo.AZON, req.body.admin == 'on');
        } else {
            await lektorok.updateLektor(req.body.azon, req.body.fokozat, req.body.intezet, req.body.szakterulet);
        }
    }
    res.redirect("/profil/" + req.params.nev);
});

module.exports = router; 
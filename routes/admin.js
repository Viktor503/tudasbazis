const express = require('express');
const router = express.Router();
const cikkDAO = require('../dao/cikkDAO');
const felhasznaloDAO = require('../dao/felhasznaloDAO');
const kulcsszoDAO = require('../dao/kulcsszoDAO');
const lektorDAO = require('../dao/lektorDAO');
const nyelvDAO = require('../dao/nyelvDAO');
const hibajelentesDAO = require('../dao/hibajelentesDAO');

router.get('/', async (req, res) => {
    if (!req.user?.admin) {
        res.sendStatus(403);
        return;
    }
    const felhasznalo = new felhasznaloDAO(req.conn);
    const felhasznalokCikkekNelkul = await felhasznalo.getFelhasznalokCikkekNelkul();
    res.render('admin', {"title": "Admin",user: req.user, felhasznalokCikkekNelkul});
});

router.get('/cikkek', async (req, res) => {
    if (!req.user?.admin) {
        res.sendStatus(403);
        return;
    }
    const cikk = new cikkDAO(req.conn);
    const cikkek = await cikk.getAll();
    res.render('list', {"title": "Cikkek", data : cikkek,user: req.user});
});


router.get('/cikkek/:azon', async (req, res) => {
    const cikkek = new cikkDAO(req.conn);
    const cikk = await cikkek.getByAzon(req.params.azon);
    if (!cikk) {
        res.status(404).send("404 Not Found");
        return;
    }
    if (!szerzo) {
        szerzo = "Ismeretlen";
    }
    res.render('cikk', {"title": cikk.CIM, cikk, szerzo, user: req.user, edit: true});
}); 

router.get('/felhasznalok', async (req, res) => {
    if (!req.user?.admin) {
        res.sendStatus(403);
        return;
    }
    const felhasznalo = new felhasznaloDAO(req.conn);
    const felhasznalok = await felhasznalo.getAll();
    res.render('list', {"title": "Felhasználók", data : felhasznalok,user: req.user});
});

router.get('/kulcsszavak', async (req, res) => {
    if (!req.user?.admin) {
        res.sendStatus(403);
        return;
    }
    const kulcsszo = new kulcsszoDAO(req.conn);
    const kulcsszavak = await kulcsszo.getAll();
    res.render('list', {"title": "Kulcsszavak", data : kulcsszavak,user: req.user});
});

router.get('/lektorok', async (req, res) => {
    if (!req.user?.admin) {
        res.sendStatus(403);
        return;
    }
    const lektor = new lektorDAO(req.conn);
    const lektorok = await lektor.getAll();
    res.render('list', {"title": "Lektorok", data : lektorok,user: req.user});
});

router.get('/nyelvek', async (req, res) => {
    if (!req.user?.admin) {
        res.sendStatus(403);
        return;
    }
    const nyelv = new nyelvDAO(req.conn);
    const nyelvek = await nyelv.getAll();
    res.render('list', {"title": "Nyelvek", data : nyelvek,user: req.user});
});

router.get('/hibajelentesek', async (req, res) => {
    if (!req.user?.admin) {
        res.sendStatus(403);
        return;
    }
    const hibajelentes = new hibajelentesDAO(req.conn);
    const hibajelentesek = await hibajelentes.getAll();
    res.render('list', {"title": "Hibajelentések", data : hibajelentesek, user: req.user});
});

router.get('/hibajelentesek/:azon', async (req, res) => {
    const hibajelentesek = new hibajelentesDAO(req.conn);
    const cikkek = new cikkDAO(req.conn);
    const hibajelentes = await hibajelentesek.getByAzon(req.params.azon);
    const cikk = await cikkek.getByAzon(req.params.azon);
    if (!hibajelentes) {
        res.status(404).send("404 Not Found");
        return;
    }
    res.render('hibajelentes', {"title": "Hibajelentés: " + cikk.CIM, hibajelentes, cikk, user: req.user});
    res.render('list', {"title": "Hibabejelentések", data : hibajelentesek,user: req.user});
});

router.get('/reset', async (req, res) => {
    if (!req.user?.admin) {
        res.sendStatus(403);
        return;
    }
    req.conn.createDatabase();
    res.clearCookie('auth_token');
    res.redirect("/");
});

router.get('/lektoradd', async (req, res) => {
    if (!req.user?.admin) {
        res.sendStatus(403);
        return;
    }
    const lektordao = new lektorDAO(req.conn);
    const cikkdao = new cikkDAO(req.conn);
    const lektorok = await lektordao.getAllWithNev();
    const cikkek = await cikkdao.getWaitingForLektor();
    res.render('lektoradd', {"title": "Lektor-hozzárendelés", user: req.user, lektorok, cikkek});
});

router.post('/lektoradd', async (req, res) => {
    if (!req.user?.admin) {
        res.sendStatus(403);
        return;
    }
    const cikkazon = req.body.cikk;
    const cikkdao = new cikkDAO(req.conn);
    await cikkdao.updateLektor(Number(cikkazon), Number(req.body.lektor));
    res.redirect("/cikkek/" +cikkazon);
});

module.exports = router;
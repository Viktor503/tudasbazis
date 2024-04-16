const express = require('express');
const router = express.Router();
const cikkDAO = require('../dao/cikkDAO');
const felhasznaloDAO = require('../dao/felhasznaloDAO');
const kulcsszoDAO = require('../dao/kulcsszoDAO');
const lektorDAO = require('../dao/lektorDAO');
const nyelvDAO = require('../dao/nyelvDAO');
const hibajelentesDAO = require('../dao/hibajelentesDAO');

router.get('/', async (req, res) => {
    if (!req.user || !req.user.admin) {
        res.status(403).send('403 Forbidden');
        return;
    }
    res.render('admin', {"title": "Admin",user: req.user});
});

router.get('/cikkek', async (req, res) => {
    if (!req.user || !req.user.admin) {
        res.status(403).send('403 Forbidden');
        return;
    }
    const cikk = new cikkDAO(req.conn);
    const cikkek = await cikk.getAll();
    res.render('list', {"title": "Cikkek", data : cikkek,user: req.user});
});

router.get('/cikkeke', async (req, res) => {
    if (!req.user || !req.user.admin) {
        res.status(403).send('403 Forbidden');
        return;
    }
    const cikk = new cikkDAO(req.conn);
    const cikkek = await cikk.getAll();
    console.log(cikkek);
    res.render('list', {"title": "Cikkek", data : cikkek,user: req.user, edit: true, route: "/cikkeke/"});
});

router.get('/felhasznalok', async (req, res) => {
    if (!req.user || !req.user.admin) {
        res.status(403).send('403 Forbidden');
        return;
    }
    const felhasznalo = new felhasznaloDAO(req.conn);
    const felhasznalok = await felhasznalo.getAll();
    res.render('list', {"title": "Felhasználók", data : felhasznalok,user: req.user});
});

router.get('/felhasznaloke', async (req, res) => {
    if (!req.user || !req.user.admin) {
        res.status(403).send('403 Forbidden');
        return;
    }
    const felhasznalo = new felhasznaloDAO(req.conn);
    const felhasznalok = await felhasznalo.getAll();
    res.render('list', {"title": "Felhasználók", data : felhasznalok,user: req.user, edit: true, route: "/felhasznaloke/"});
});

router.get('/kulcsszavak', async (req, res) => {
    if (!req.user || !req.user.admin) {
        res.status(403).send('403 Forbidden');
        return;
    }
    const kulcsszo = new kulcsszoDAO(req.conn);
    const kulcsszavak = await kulcsszo.getAll();
    res.render('list', {"title": "Kulcsszavak", data : kulcsszavak,user: req.user});
});

router.get('/kulcsszavake', async (req, res) => {
    if (!req.user || !req.user.admin) {
        res.status(403).send('403 Forbidden');
        return;
    }
    const kulcsszo = new kulcsszoDAO(req.conn);
    const kulcsszavak = await kulcsszo.getAll();
    res.render('list', {"title": "Kulcsszavak", data : kulcsszavak,user: req.user, edit: true, route: "/kulcsszavake/"});
});

router.get('/lektorok', async (req, res) => {
    if (!req.user || !req.user.admin) {
        res.status(403).send('403 Forbidden');
        return;
    }
    const lektor = new lektorDAO(req.conn);
    const lektorok = await lektor.getAll();
    res.render('list', {"title": "Lektorok", data : lektorok,user: req.user});
});

router.get('/lektoroke', async (req, res) => {
    if (!req.user || !req.user.admin) {
        res.status(403).send('403 Forbidden');
        return;
    }
    const lektor = new lektorDAO(req.conn);
    const lektorok = await lektor.getAll();
    res.render('list', {"title": "Lektorok", data : lektorok,user: req.user,edit: true, route: "/lektoroke/"});
});

router.get('/nyelvek', async (req, res) => {
    if (!req.user || !req.user.admin) {
        res.status(403).send('403 Forbidden');
        return;
    }
    const nyelv = new nyelvDAO(req.conn);
    const nyelvek = await nyelv.getAll();
    res.render('list', {"title": "Nyelvek", data : nyelvek,user: req.user});
});

router.get('/nyelveke', async (req, res) => {
    if (!req.user || !req.user.admin) {
        res.status(403).send('403 Forbidden');
        return;
    }
    const nyelv = new nyelvDAO(req.conn);
    const nyelvek = await nyelv.getAll();
    res.render('list', {"title": "Nyelvek", data : nyelvek,user: req.user,edit: true, route: "/nyelveke/"});
});

router.get('/hibajelentesek', async (req, res) => {
    if (!req.user || !req.user.admin) {
        res.status(403).send('403 Forbidden');
        return;
    }
    const hibajelentes = new hibajelentesDAO(req.conn);
    const hibajelentesek = await hibajelentes.getAll();
    console.log(hibajelentesek);
    res.render('list', {"title": "Hibabejelentések", data : hibajelentesek,user: req.user});
});

router.get('/hibajelenteseke', async (req, res) => {
    if (!req.user || !req.user.admin) {
        res.status(403).send('403 Forbidden');
        return;
    }
    const hibajelentes = new hibajelentesDAO(req.conn);
    const hibajelentesek = await hibajelentes.getAll();
    res.render('list', {"title": "Hibabejelentések", data : hibajelentesek,user: req.user,edit: true, route: "/hibajelenteseke/"});
});


router.get('/reset', async (req, res) => {
    if (!req.user || !req.user.admin) {
        res.status(403).send('403 Forbidden');
        return;
    }
    req.conn.createDatabase();
    res.redirect("/");
});



module.exports = router;
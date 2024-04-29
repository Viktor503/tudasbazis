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
        res.status(403).send('403 Forbidden');
        return;
    }
    const felhasznalo = new felhasznaloDAO(req.conn);
    const felhasznalokCikkekNelkul = await felhasznalo.getFelhasznalokCikkekNelkul();
    res.render('admin', {"title": "Admin",user: req.user, felhasznalokCikkekNelkul});
});

router.get('/cikkek', async (req, res) => {
    if (!req.user?.admin) {
        res.status(403).send('403 Forbidden');
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
        let szerzo = "Ismeretlen";
    }
    res.render('cikk', {"title": cikk.CIM, cikk, szerzo, user: req.user, edit: true});
}); 
// @deprecated - use /cikkek/:azon/edit instead
router.get('/cikkeke/:azon', async (req, res) => {
    const cikkek = new cikkDAO(req.conn);
    const felhasznalok = new felhasznaloDAO(req.conn);
    const cikk = await cikkek.getByAzon(req.params.azon);
    if (!cikk) {
        res.status(404).send("404 Not Found");
        return;
    }
    let szerzo = (await felhasznalok.getByAzon(cikk?.SZERZOAZON))?.NEV;
    if (!szerzo) {
        szerzo = "Ismeretlen";
    }
    const kDao = new kulcsszoDAO(req.conn);
    const kulcsszavak = await kDao.getAll(); 
    cikk.kulcsszavak = await cikkek.getKulcsszavak(req.params.azon);
    const hasonlocikkek = await cikkek.getHasonlo(req.params.azon);
    res.render('cikkEdit', {"title": cikk.CIM, cikk, szerzo, user: req.user,kulcsszavak,hasonlo:hasonlocikkek, edit: true});
});

router.post('/cikkek/update/:azon', async (req, res) => {
    const cikkek = new cikkDAO(req.conn);
    const kulccsszavak = new kulcsszoDAO(req.conn);
    const regiCikk = await cikkek.getByAzon(req.params.azon);
    if (req.body.azon && req.body.cim && req.body.tartalom && req.user && (req.user.azon === regiCikk.SZERZOAZON || req.user.admin)) {
        await cikkek.updateCikk(req.body.azon, req.body.cim, req.body.tartalom);
        await kulccsszavak.updateKulcsszavak(req.body.azon, req.body.kulcsszavak);
        // TODO: triggerrel növelni a módosítások számát
        res.redirect("/admin");
        return;
    }
    res.sendStatus(403);
});

router.get('/cikkeke', async (req, res) => {
    if (!req.user?.admin) {
        res.status(403).send('403 Forbidden');
        return;
    }
    const cikk = new cikkDAO(req.conn);
    const cikkek = await cikk.getAll();
    res.render('list', {"title": "Cikkek", data : cikkek,user: req.user, edit: true, route: "/admin/cikkeke/"});
});

router.get('/felhasznalok', async (req, res) => {
    if (!req.user?.admin) {
        res.status(403).send('403 Forbidden');
        return;
    }
    const felhasznalo = new felhasznaloDAO(req.conn);
    const felhasznalok = await felhasznalo.getAll();
    res.render('list', {"title": "Felhasználók", data : felhasznalok,user: req.user});
});

router.get('/felhasznaloke', async (req, res) => {
    if (!req.user?.admin) {
        res.status(403).send('403 Forbidden');
        return;
    }
    const felhasznalo = new felhasznaloDAO(req.conn);
    const felhasznalok = await felhasznalo.getAll();
    res.render('list', {"title": "Felhasználók", data : felhasznalok,user: req.user, edit: true, route: "/admin/felhasznaloke/"});
});

router.get('/felhasznaloke/:azon', async (req, res) => {
    if (!req.user?.admin) {
        res.status(403).send('403 Forbidden');
        return;
    }
    const felhasznalo = new felhasznaloDAO(req.conn);
    const felhasznalok = await felhasznalo.getAll();
    let user = await felhasznalo.getByAzon(req.params.azon);
    res.render('register', {"title": "Felhasználók", edit: true, route: "/admin/felhasznaloke/", user: user});
});

router.post('/felhasznaloke/:azon', async (req, res) => {
    let azon = req.params.azon
    let admin = 0;
    let lektor = null;
    if(req.body.admin){
        admin = 1;
    }
    if(req.body.lektor){
        lektor = 1;
    }
    let f = new felhasznaloDAO(req.conn);
    let l = new lektorDAO(req.conn);
    let user = await f.getByAzon(azon);
    if(user.LEKTORAZON == null){
        if(lektor == 1){
            await l.insertLektor(req.body.fokozat, req.body.intezmeny, req.body.szakterulet);
            lektor = await l.getLatestAzon();
            lektor = lektor['MAX(AZON)'];
        }
    }
    
    
    await f.updateFelhasznaloLektor(azon, lektor);
    
    await f.updateFelhasznaloAdmin(azon, admin);

    res.redirect("/admin");
});

router.get('/kulcsszavak', async (req, res) => {
    if (!req.user?.admin) {
        res.status(403).send('403 Forbidden');
        return;
    }
    const kulcsszo = new kulcsszoDAO(req.conn);
    const kulcsszavak = await kulcsszo.getAll();
    res.render('list', {"title": "Kulcsszavak", data : kulcsszavak,user: req.user});
});

router.get('/kulcsszavake', async (req, res) => {
    if (!req.user?.admin) {
        res.status(403).send('403 Forbidden');
        return;
    }
    const kulcsszo = new kulcsszoDAO(req.conn);
    const kulcsszavak = await kulcsszo.getAll();
    res.render('list', {"title": "Kulcsszavak", data : kulcsszavak,user: req.user, edit: true, route: "/admin/kulcsszavake/"});
});

router.get('/lektorok', async (req, res) => {
    if (!req.user?.admin) {
        res.status(403).send('403 Forbidden');
        return;
    }
    const lektor = new lektorDAO(req.conn);
    const lektorok = await lektor.getAll();
    res.render('list', {"title": "Lektorok", data : lektorok,user: req.user});
});

router.get('/lektoroke', async (req, res) => {
    if (!req.user?.admin) {
        res.status(403).send('403 Forbidden');
        return;
    }
    const lektor = new lektorDAO(req.conn);
    const lektorok = await lektor.getAll();
    res.render('list', {"title": "Lektorok", data : lektorok,user: req.user,edit: true, route: "/admin/lektoroke/"});
});

router.get('/nyelvek', async (req, res) => {
    if (!req.user?.admin) {
        res.status(403).send('403 Forbidden');
        return;
    }
    const nyelv = new nyelvDAO(req.conn);
    const nyelvek = await nyelv.getAll();
    res.render('list', {"title": "Nyelvek", data : nyelvek,user: req.user});
});

router.get('/nyelveke', async (req, res) => {
    if (!req.user?.admin) {
        res.status(403).send('403 Forbidden');
        return;
    }
    const nyelv = new nyelvDAO(req.conn);
    const nyelvek = await nyelv.getAll();
    res.render('list', {"title": "Nyelvek", data : nyelvek,user: req.user,edit: true, route: "/admin/nyelveke/"});
});

router.get('/hibajelentesek', async (req, res) => {
    if (!req.user?.admin) {
        res.status(403).send('403 Forbidden');
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
    console.log(hibajelentesek);
    res.render('list', {"title": "Hibabejelentések", data : hibajelentesek,user: req.user});
});

router.get('/hibajelenteseke', async (req, res) => {
    if (!req.user?.admin) {
        res.status(403).send('403 Forbidden');
        return;
    }
    const hibajelentes = new hibajelentesDAO(req.conn);
    const hibajelentesek = await hibajelentes.getAll();
    res.render('list', {"title": "Hibabejelentések", data : hibajelentesek,user: req.user,edit: true, route: "/admin/hibajelenteseke/"});
});


router.get('/reset', async (req, res) => {
    if (!req.user?.admin) {
        res.status(403).send('403 Forbidden');
        return;
    }
    req.conn.createDatabase();
    res.clearCookie('auth_token');
    res.redirect("/");
});



module.exports = router;
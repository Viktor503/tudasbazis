const express = require('express');
const router = express.Router();
const CikkDAO = require('../dao/cikkDAO');
const NyelvDAO = require('../dao/nyelvDAO');
const KulcsszoDAO = require('../dao/kulcsszoDAO');
const FelhasznaloDAO = require('../dao/felhasznaloDAO');

router.get('/', async (req, res) => {
    const cikkDAO = new CikkDAO(req.conn);
    const cikkek = await cikkDAO.getAll();
    res.render('cikklista', {"title": "Cikkek", cikkek, user: req.user});
});

router.get('/uj', async (req, res) => {
    const nyelv = new NyelvDAO(req.conn);
    const nyelvek = await nyelv.getAll();

    const kulcsszo = new KulcsszoDAO(req.conn);
    const kulcsszavak = await kulcsszo.getAll();
    res.render('ujcikk', {"title": "Új cikk", nyelvek, kulcsszavak, user: req.user});
});

router.post('/uj', async (req, res) => {
    const cikk = new CikkDAO(req.conn);
    const nyelv = new NyelvDAO(req.conn);
    const kulcsszodao = new KulcsszoDAO(req.conn);
    const nyelvek = await nyelv.getAll();

    const kulcsszo = new KulcsszoDAO(req.conn);
    const kulcsszavak = await kulcsszo.getAll();
    if(req.body.cim.length < 5){
        res.render('ujcikk', {"title": "Új cikk", nyelvek, kulcsszavak, user: req.user, "error": "A címnek legalább 5 karakter hosszúnak kell lennie"});
        return;     
    }
    if(req.body.szoveg.length < 20){
        res.render('ujcikk', {"title": "Új cikk", nyelvek, kulcsszavak, user: req.user, "error": "A cikknek legalább 20 karakter hosszúnak kell lennie"});
        return;
    }
    let editKulcsszavak = req.body.kulcsszavak
    if(!editKulcsszavak && req.body.ujkulcsszo == ''){
        res.render('ujcikk', {"title": "Új cikk", nyelvek, kulcsszavak, user: req.user, "error": "Legalább egy kulcsszót meg kell adni"});
        return;
    }


    console.log(req.body)
    
    ujkulcsszo = req.body.ujkulcsszo
    if(!editKulcsszavak){
        editKulcsszavak = []
    }
    if(ujkulcsszo != ''){
        editKulcsszavak.push('0')
    }
    let cikkid = await cikk.insertCikkReturnId(req.body.cim, req.user.azon, req.body.szoveg);
    editKulcsszavak.forEach(async element => {
       
       if(element == '0'){
           let kulcsszoazon = await kulcsszodao.insertKulcsszoreturnId(ujkulcsszo);
           await kulcsszodao.insertKulcsszokapcsolat(cikkid, kulcsszoazon);
       }else{
            await kulcsszodao.insertKulcsszokapcsolat(cikkid, element);
       }
    });
    res.redirect("/cikkek");
});

router.get('/:azon', async (req, res) => {
    const cikkDAO = new CikkDAO(req.conn);
    const cikk = await cikkDAO.getByAzon(req.params.azon);
    const felhasznaloDAO = new FelhasznaloDAO(req.conn);
    const hasonlocikkek = await cikkDAO.getHasonlo(req.params.azon);
    const nyelvszerint = await cikkDAO.nyelvSzerint();
    cikk.kulcsszavak = await cikkDAO.getKulcsszavak(req.params.azon);
    let szerzo = (await felhasznaloDAO.getByAzon(cikk?.SZERZOAZON))?.NEV;
    if (!szerzo) {
        szerzo = "Ismeretlen";
    }
    if (!cikk) {
        res.status(404).send("404 Not Found");
        return;
    }
    
    res.render('cikk', {"title": cikk.CIM, cikk, szerzo, user: req.user, hasonlo: hasonlocikkek});
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
    const kulcsszoDAO = new KulcsszoDAO(req.conn);
    const kulcsszavak = await kulcsszoDAO.getAll(); 
    const hasonlocikkek = await cikkDAO.getHasonlo(req.params.azon);

    cikk.kulcsszavak = await cikkDAO.getKulcsszavak(req.params.azon);
    let szerzo = await felhasznaloDAO.getByAzon(cikk.SZERZOAZON).NEV;
    if (!szerzo) {
        szerzo = "Ismeretlen";
    }
    res.render('cikkEdit', {"title": cikk.CIM, cikk, szerzo, user: req.user, kulcsszavak, hasonlo: hasonlocikkek});
});

router.post('/:azon/edit', async (req, res) => {
    const cikkek = new CikkDAO(req.conn);
    const regiCikk = await cikkek.getByAzon(req.params.azon);
    console.log(req.body)
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
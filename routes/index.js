const express = require('express');
const router = express.Router();

const {verifyToken} = require('../config/auth');

const cikkDAO = require('../dao/cikkDAO');
const kulcsszoDAO = require('../dao/kulcsszoDAO');
const lektorDAO = require('../dao/lektorDAO');
const nyelvDAO = require('../dao/nyelvDAO');
const hibajelentesDAO = require('../dao/hibajelentesDAO');

router.get('/', async (req, res) => {
    var user = {};
    verifyToken(req, res, () => {
        if(req.user)
            user = req.user;
    });
    console.log(user);
    res.render('index', {"title": "Kezdőoldal", user: user});
});

router.get('/cikkek', async (req, res) => {
    const cikk = new cikkDAO(req.conn);
    const cikkek = await cikk.getAll();
    res.render('list', {"title": "Cikkek", data : cikkek});
});

router.get('/kulcsszavak', async (req, res) => {
    const kulcsszo = new kulcsszoDAO(req.conn);
    const kulcsszavak = await kulcsszo.getAll();
    res.render('list', {"title": "Kulcsszavak", data : kulcsszavak});
});

router.get('/lektorok', async (req, res) => {
    const lektor = new lektorDAO(req.conn);
    const lektorok = await lektor.getAll();
    res.render('list', {"title": "Lektorok", data : lektorok});
});

router.get('/nyelvek', async (req, res) => {
    const nyelv = new nyelvDAO(req.conn);
    const nyelvek = await nyelv.getAll();
    res.render('list', {"title": "Nyelvek", data : nyelvek});
});

router.get('/hibajelentesek', async (req, res) => {
    const hibajelentes = new hibajelentesDAO(req.conn);
    const hibajelentesek = await hibajelentes.getAll();
    res.render('list', {"title": "Hibajelentések", data : hibajelentesek});
});

module.exports = router; 
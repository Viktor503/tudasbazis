const express = require('express')
const router = express.Router()
const FelhasznaloDAO = require('../dao/felhasznaloDAO');

const bcrypt = require("bcrypt");

router.get('/', async (req, res) => {
    res.render('register', {"title": "Regisztráció"});
});

router.post('/', async (req, res) => {
    felhasznaloDAO = new FelhasznaloDAO(req.conn);
    const nev = req.body.username;
    const jelszo = req.body.password;
    const jelszo2 = req.body.password2;

    if(jelszo !== jelszo2){
        return res.render('register', {"title": "Regisztráció", "error": "A két jelszó nem egyezik meg!"});
    }
    //ha létezik már ilyen felhasználó todo
    if(await felhasznaloDAO.getByNev(nev)){
        return res.render('register', {"title": "Regisztráció", "error": "Már létezik ilyen felhasználó!"});
    }

    await felhasznaloDAO.insertFelhasznalo(nev,jelszo,0,null);
    res.redirect("/");
});

module.exports = router; 
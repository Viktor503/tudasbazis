const express = require('express')
const router = express.Router()
const FelhasznaloDAO = require('../dao/felhasznaloDAO');

const bcrypt = require("bcrypt");
const { render } = require('ejs');

router.get('/', async (req, res) => {
    res.render('register', {"title": "Regisztráció",user: req.user});
});

router.post('/', async (req, res) => {
    felhasznaloDAO = new FelhasznaloDAO(req.conn);
    const nev = req.body.username;
    const jelszo = req.body.password;
    const jelszo2 = req.body.password2;

    if(jelszo !== jelszo2){
        return res.render('register', {"title": "Regisztráció", "error": "A két jelszó nem egyezik meg!",user: req.user});
    }
    //ha létezik már ilyen felhasználó todo
    if(await felhasznaloDAO.getByNev(nev)){
        return res.render('register', {"title": "Regisztráció", "error": "Már létezik ilyen felhasználó!",user: req.user});
    }

    await felhasznaloDAO.insertFelhasznalo(nev,jelszo);
    res.redirect('login');
    
});

module.exports = router; 
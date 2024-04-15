const express = require('express');
const FelhasznaloDAO = require('../dao/felhasznaloDAO');
const router = express.Router()
const bcrypt = require("bcrypt");

router.get('/', async (req, res) => {
    res.render('login', {"title": "Bejelentkezés"});
});


router.post("/",async (req, res) => {
    const nev = req.body.username;
    const jelszo = req.body.password;
    const felhasznaloDao = new FelhasznaloDAO(req.conn);
    const user = await felhasznaloDao.getByNev(nev);
    console.log(user);
    if (user) {
        const match = await bcrypt.compare(jelszo, user.JELSZO);
        if (match) {
            const token = generateToken({nev: user.nev, admin: user.admin});
            res.cookie('auth_token', token);
            
            return res.redirect('/');
        }else{
            res.render('login', {"title": "Bejelentkezés",error: "Hibás jelszó" })
        }
    }else{
        res.render('login', {"title": "Bejelentkezés",error: "Hibás felhasználónév" })
    }

});


module.exports = router; 
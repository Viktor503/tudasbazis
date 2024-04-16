const express = require('express');
const FelhasznaloDAO = require('../dao/felhasznaloDAO');
const router = express.Router()
const bcrypt = require("bcrypt");
const {verifyToken,generateToken} = require('../config/auth');


router.get('/', async (req, res) => {
    let regsucc;
    let user = {};
    verifyToken(req, res, () => {
        if(req.user)
            user = req.user;
    });
    if(user.azon){
        res.clearCookie('auth_token');
        return res.redirect('/');
    }
    if(req.query.regsucc){
        regsucc = true;
    }
    res.render('login', {"title": "Bejelentkezés",user: req.user, regsucc});
});


router.post("/",async (req, res) => {
    const nev = req.body.username;
    const jelszo = req.body.password;
    const felhasznaloDao = new FelhasznaloDAO(req.conn);
    const user = await felhasznaloDao.getByNev(nev);
    if (user) {
        const match = await bcrypt.compare(jelszo, user.JELSZO);
        if (match) {
            const token = generateToken({azon: user.AZON,nev: user.NEV, admin: user.ADMIN});
            res.cookie('auth_token', token);
            return res.redirect('/');
        }else{
            res.render('login', {"title": "Bejelentkezés",error: "Hibás jelszó" ,user: req.user})
        }
    }else{
        res.render('login', {"title": "Bejelentkezés",error: "Hibás felhasználónév" ,user: req.user})
    }

});


module.exports = router; 
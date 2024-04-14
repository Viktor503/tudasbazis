const express = require('express');
const router = express.Router();
const FelhasznaloDAO = require('../dao/felhasznaloDAO');

router.get('/', async (req, res) => {
    const felhasznaloDAO = new FelhasznaloDAO(req.conn);
    let adat;
    //adat = await felhasznaloDAO.getByAzon(1); //adat.NEV = janos.kovacs123
    //adat = await felhasznaloDAO.getByNev("janos.kovacs123"); //adat.AZON = 1
    //adat = await felhasznaloDAO.getByNev("nem OR 1=1") //ekkor lecrashel, ami egyenlőre jó
    console.log(adat);
    res.render('index', {"title": "Kezdőoldal", adat: adat});
});

module.exports = router; 
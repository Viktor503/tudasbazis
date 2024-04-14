const express = require('express');
const router = express.Router();
const FelhasznaloDAO = require('../dao/felhasznaloDAO');

router.get('/', async (req, res) => {
    const felhasznaloDAO = new FelhasznaloDAO(req.conn);
    const kiirni = await felhasznaloDAO.getAll();
    kiirni.forEach(element => {
        console.log(element.NEV);
    });
    const kiirni2 = await felhasznaloDAO.getByAzon(1);
    console.log(kiirni2);
    let adat;
    res.render('index', {"title": "Kezdőoldal", adat});
});

module.exports = router; 
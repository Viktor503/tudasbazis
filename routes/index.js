const express = require('express')
const router = express.Router()
const Connection = require('../config/db');

let conn = new Connection();

router.get('/', async (req, res) => {
    let adat = (await conn.execute("SELECT * FROM dual")).rows[0];

    res.render('index', {"title": "Kezdőoldal", adat});
});

module.exports = router; 
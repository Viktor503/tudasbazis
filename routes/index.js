const express = require('express')
const router = express.Router()
const Connection = require('../config/db');

let conn = new Connection();

router.get('/', (req, res) => {
    let adat = conn.execute("SELECT * FROM dual;");
    res.render('index', {"title": "Kezdőoldal", adat});
});

module.exports = router;
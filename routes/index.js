const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    let adat = await req.conn.selectOne("SELECT * FROM dual");
    console.log(adat.DUMMY);
    res.render('index', {"title": "Nem a kezdőoldal", adat: adat.DUMMY});
});

module.exports = router; 
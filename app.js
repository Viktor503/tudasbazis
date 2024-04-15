const express = require('express')
const app = express();
const port = 3000;

const fs = require('fs');
const Connection = require('./config/db');

app.set("view engine", "ejs");

app.use("/css", express.static("./public/css"));
app.use("/scripts", express.static("./public/scripts"));
app.use("/img", express.static("./public/img"));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  const conn = await Connection.create();
  req.conn = conn;
  next();
})

const indexRouter = require("./routes/index");
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const adminRouter = require("./routes/admin");

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/admin", adminRouter);

app.use("*", (req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(port, () => {
  if(!process.env.USER || !process.env.PASSWORD){
    console.log("#".repeat(50));
    console.log("Nem találtam valamilyen fontos környezeti változót, valami baj van!");
    console.log("Hozz létre egy \".env\" fájlt a gyökérkönyvtárban, és add meg ezeket az adataidat benne:");
    console.log("USER=\"felhasznalonev\"");
    console.log("PASSWORD=\"jelszoAmiSQLDevbenIsVan\"");
    console.log("#".repeat(50));
    process.exit(1);
  }
  fs.access(process.env.IC_PATH ? process.env.IC_PATH : "C:\\oracle\\instantclient_21_13", (err) => {
    if(err){
      console.log("#".repeat(50));
      console.log("Nem találtam az Oracle Instant Client-et!");
      console.log("Töltsd le innen: https://download.oracle.com/otn_software/nt/instantclient/instantclient-basic-windows.zip");
      console.log("Vagy a C:\\oracle\\instantclient_21_13 mappába csomagold ki a letöltött fájlt,");
      console.log("vagy add meg a .env fájlban az IC_PATH változó értékét, ami a kicsomagolt mappára mutat.")
      console.log("Escapeld a backslasht! (\\ -> \\\\)!")
      console.log("(Például: IC_PATH=\"C:\\\\instantclient_21_13\")");
      console.log("#".repeat(50));
      process.exit(1);
    }
  });
  console.log(`A tudásbázis itt fut: http://localhost:${port}`)
})
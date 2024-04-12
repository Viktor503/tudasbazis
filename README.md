- npm install
- csinálj egy `.env` fájlt a gyökérkönyvtárban
  - `NAME="felhasznalonev"`
  - `PASSWORD="jelszoAmiSQLDevbenIsVan"` 
- töltsd le az [Oracle Instant Clientet](https://download.oracle.com/otn_software/nt/instantclient/instantclient-basic-windows.zip), és vagy a `C:\oracle\instantclient_21_13` mappába csomagold ki, vagy a `.env` fájlban állítsd be a `IC_PATH`-t (pl: `IC_PATH="C:\\instantclient_21_13"`)
- npm run dev
- :D
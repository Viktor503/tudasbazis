const oracledb = require('oracledb');

try {
    oracledb.initOracleClient({ libDir: process.env.IC_PATH ? process.env.IC_PATH : "C:\\oracle\\instantclient_21_13" });
} catch (err) {
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

class Connection {
    constructor() {
        oracledb.getConnection({
            user          : process.env.USER,
            password      : process.env.PASSWORD, 
            connectString : "localhost/XEPDB1"
        }).then((conn) => {
            console.log("Connected to Oracle Database");
            this.connection = conn;
        }).catch((err) => {
            console.log(err);
        });
    }

    async execute(query) {
        return this.connection.execute(query);
    }

    async close() {
        await this.connection.close();
    }
}

module.exports = Connection;
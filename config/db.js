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
    constructor(connection) {
        this.connection = connection
        oracledb.autoCommit = true;
        oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
    }

    static instance = null;

    static async create() {
        if (!this.instance) {
            let connection;
            try {
                connection = await oracledb.getConnection({
                    user          : process.env.USER,
                    password      : process.env.PASSWORD, 
                    connectString : "localhost/xe"
                });
                console.log("Connected to Oracle Database");
            } catch (err) {
                console.log(err);
            }
            this.instance = new Connection(connection);
        }
        return this.instance;
    }

    async returnOne(query, binds = {}) {
        try {
            const result = await this.connection.execute(query, binds);
            //console.log(result.rows[0]);
            return result.rows[0];
        } catch (err) {
            console.log(err);
        }
    }

    async returnMore(query, binds = {}) {
        try {
            const result = await this.connection.execute(query, binds);
            //console.log(result.rows);
            return result.rows;
        } catch (err) {
            console.log(err);
        }
    }

    async returnAll(table) {
        try {
            const result = await this.connection.execute("SELECT * FROM " + table);
            //console.log(result.rows);
            return result.rows;
        } catch (err) {
            console.log(err);
        }
    }

    async returnNone(query, binds = {}) {
        try {
            const result = await this.connection.execute(query, binds);
            //console.log(result.rows[0]);
            } catch (err) {
              console.log(err);
        }
    }

    async insert(table, values) {
        try {
            const result = await this.connection.execute(`INSERT INTO ${table} VALUES (${values})`);
            return result;
        } catch (err) {
            console.log(err);
        }
    }

    async insertWithColumns(table, columns, values){
        try {
            console.log(`INSERT INTO ${table} (${columns}) VALUES (${values})`)
            const result = await this.connection.execute(`INSERT INTO ${table} (${columns}) VALUES (${values})`);
            log(result);
            return result;
        } catch (err) {
            console.log(err);
        }
    }

    async close() {
        await this.connection.close();
    }
}

module.exports = Connection;
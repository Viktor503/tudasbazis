const oracledb = require('oracledb');

class KulcsszoDAO {
    constructor(connection) {
        this.connection = connection;
    }

    async getAll() {
        return await this.connection.returnMore(`SELECT * FROM kulcsszo`);
    }

    async getByAzon(azon) {
        return await this.connection.returnOne(`SELECT * FROM kulcsszo WHERE azon = :azon`, { azon: { val: Number(azon), dir: oracledb.BIND_IN, type: oracledb.NUMBER } });
    }

    async getByKulcsszoNev(kulcsszoNev) {
        await this.connection.returnMore(`SELECT * FROM kulcsszo WHERE kulcsszoNev LIKE %:kulcsszoNev%`, { kulcsszoNev: { val: String(kulcsszoNev), dir: oracledb.BIND_IN, type: oracledb.STRING } });
    }

    async insertKulcsszo(kulcsszoNev) {
        await this.connection.returnNone(`INSERT INTO kulcsszo (kulcsszoNev) VALUES (:kulcsszoNev)`, { kulcsszoNev: { val: String(kulcsszoNev), dir: oracledb.BIND_IN, type: oracledb.STRING } });
    }

    async deleteKulcsszo(azon) {
        await this.connection.returnNone(`DELETE FROM kulcsszo WHERE azon = :azon`, { azon: { val: Number(azon), dir: oracledb.BIND_IN, type: oracledb.NUMBER } });
    }
}

module.exports = KulcsszoDAO;
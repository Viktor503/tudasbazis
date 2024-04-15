const oracledb = require('oracledb');

class NyelvDAO {
    constructor(connection) {
        this.connection = connection;
    }

    async getAll() {
        return await this.connection.returnMore(`SELECT * FROM nyelv`);
    }

    async getByAzon(azon) {
        return await this.connection.returnOne(`SELECT * FROM nyelv WHERE azon = :azon`, { azon: { val: Number(azon), dir: oracledb.BIND_IN, type: oracledb.NUMBER } });
    }

    async getByNyelv(nyelvNev) {
        return await this.connection.returnMore(`SELECT * FROM nyelv WHERE nyelvNev LIKE %:nyelvNev%`, { nyelvNev: { val: String(nyelvNev), dir: oracledb.BIND_IN, type: oracledb.STRING } });
    }

    async insertNyelv(nyelvNev) {
        await this.connection.returnNone(`INSERT INTO nyelv (nyelvNev) VALUES (:nyelvNev)`, { nyelvNev: { val: String(nyelvNev), dir: oracledb.BIND_IN, type: oracledb.STRING } });
    }

    async deleteNyelv(azon) {
        await this.connection.returnNone(`DELETE FROM nyelv WHERE azon = :azon`, { azon: { val: Number(azon), dir: oracledb.BIND_IN, type: oracledb.NUMBER } });
    }
}

module.exports = NyelvDAO;
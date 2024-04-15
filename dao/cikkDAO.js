const oracledb = require('oracledb');

class CikkDAO {
    constructor(connection) {
        this.connection = connection;
    }

    async getAll() {
        return await this.connection.returnMore(`SELECT * FROM cikk`);
    }

    async getByAzon(azon) {
        return await this.connection.returnOne(`SELECT * FROM cikk WHERE azon = :azon`, { azon: { val: Number(azon), dir: oracledb.BIND_IN, type: oracledb.NUMBER } });
    }

    async getByCim(cim) {
        return await this.connection.returnMore(`SELECT * FROM cikk WHERE cim LIKE %:cim%`, { cim: { val: String(cim), dir: oracledb.BIND_IN, type: oracledb.STRING } });
    }

    async getBySzerzoAzon(szerzoAzon) {
        return await this.connection.returnOne(`SELECT * FROM szerzo WHERE azon = :szerzoAzon`, { szerzoAzon: { val: Number(szerzoAzon), dir: oracledb.BIND_IN, type: oracledb.NUMBER } });
    }

    async getByLektorAzon(lektorAzon) {
        return await this.connection.returnOne(`SELECT * FROM lektor WHERE azon = :lektorAzon`, { lektorAzon: { val: Number(lektorAzon), dir: oracledb.BIND_IN, type: oracledb.NUMBER } });
    }

    async getByAllapot(allapot) {
        return await this.connection.returnOne(`SELECT * FROM cikk WHERE allapot = :allapot`, { allapot: { val: Number(allapot), dir: oracledb.BIND_IN, type: oracledb.NUMBER } });
    }

    async getByModositasokSzama(modositasokSzama) {
        return await this.connection.returnMore(`SELECT * FROM cikk WHERE modositasokSzama = :modositasokSzama`, { modositasokSzama: { val: Number(modositasokSzama), dir: oracledb.BIND_IN, type: oracledb.NUMBER } });
    }

    async getByTartalom(tartalom) {
        return await this.connection.returnMore(`SELECT * FROM cikk WHERE tartalom LIKE %:tartalom%`, { tartalom: { val: String(tartalom), dir: oracledb.BIND_IN, type: oracledb.CLOB } });
    }

    async insertCikk(cim, szerzoAzon, lektorAzon, allapot, modositasokSzama, tartalom) {
        await this.connection.returnNone(`INSERT INTO cikk (cim, szerzoAzon, lektorAzon, allapot, modositasokSzama, tartalom) VALUES (:cim, :szerzoAzon, :lektorAzon, :allapot, :modositasokSzama, :tartalom)`, { cim: { val: String(cim), dir: oracledb.BIND_IN, type: oracledb.STRING }, szerzoAzon: { val: Number(szerzoAzon), dir: oracledb.BIND_IN, type: oracledb.NUMBER }, lektorAzon: { val: Number(lektorAzon), dir: oracledb.BIND_IN, type: oracledb.NUMBER }, allapot: { val: Number(allapot), dir: oracledb.BIND_IN, type: oracledb.NUMBER }, modositasokSzama: { val: Number(modositasokSzama), dir: oracledb.BIND_IN, type: oracledb.NUMBER }, tartalom: { val: String(tartalom), dir: oracledb.BIND_IN, type: oracledb.CLOB } });
    }

    async deleteCikk(azon) {
        await this.connection.returnNone(`DELETE FROM cikk WHERE azon = :azon`, { azon: { val: Number(azon), dir: oracledb.BIND_IN, type: oracledb.NUMBER } });
    }
}

module.exports = CikkDAO;
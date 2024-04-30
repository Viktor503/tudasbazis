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

    async insertKulcsszoreturnId(kulcsszoNev) {
        let kulcsid = await this.connection.returnOutBinds(`INSERT INTO kulcsszo (kulcsszo) VALUES (:kulcsszoNev) RETURNING AZON INTO :azon`, { kulcsszoNev: { val: String(kulcsszoNev), dir: oracledb.BIND_IN, type: oracledb.STRING }, azon: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }});
        console.log(kulcsid);
        return kulcsid.azon[0];
    }

    async deleteKulcsszo(azon) {
        await this.connection.returnNone(`DELETE FROM kulcsszo WHERE azon = :azon`, { azon: { val: Number(azon), dir: oracledb.BIND_IN, type: oracledb.NUMBER } });
    }

    async insertKulcsszokapcsolat(azon, kulcsszoazon) {
        await this.connection.returnNone(
            `INSERT INTO kulcsszokapcsolat (cikkazon, kulcsszoazon) VALUES (:azon, :kulcsszoazon)`,
            { azon: { val: Number(azon), dir: oracledb.BIND_IN, type: oracledb.NUMBER },
            kulcsszoazon: { val: Number(kulcsszoazon), dir: oracledb.BIND_IN, type: oracledb.NUMBER } });
    }

    async deleteAllKulcsszokapcsolat(azon) {
        await this.connection.returnNone(
            `DELETE FROM kulcsszokapcsolat WHERE cikkazon = :azon`,
            { azon: { val: Number(azon), dir: oracledb.BIND_IN, type: oracledb.NUMBER } });
        }

    async updateKulcsszavak(azon, kulcsszavak){
        await this.connection.returnNone(
        `DELETE FROM kulcsszokapcsolat WHERE cikkazon = :azon`,
        {
            azon: { val: Number(azon), dir: oracledb.BIND_IN, type: oracledb.NUMBER }
        });
        if(!kulcsszavak) return;
        if(kulcsszavak.length == 0) return;
        if(kulcsszavak.length == 1){kulcsszavak = [kulcsszavak];}
        kulcsszavak.forEach(async Element => {
            await this.connection.returnNone(
                `INSERT INTO kulcsszokapcsolat (cikkazon, kulcsszoazon) VALUES (:azon, :kulcsszoazon)`,
                {
                    azon: { val: Number(azon), dir: oracledb.BIND_IN, type: oracledb.NUMBER },
                    kulcsszoazon: { val: Number(Element), dir: oracledb.BIND_IN, type: oracledb.NUMBER }
                }
            );
        });
    }

    async addKulcsszoToCikk(cikkAzon, kulcsszo){
        await this.connection.returnNone(`INSERT INTO CikkazonEsKulcsszo (azon, kulcsszo) VALUES (:cikkAzon, :kulcsszo)`,
        {
            cikkAzon: {val: Number(cikkAzon), dir: oracledb.BIND_IN, type: oracledb.NUMBER},
            kulcsszo: {val: String(kulcsszo), dir: oracledb.BIND_IN, type: oracledb.STRING}
        });
    }

    async deleteKulcsszoFromCikk(cikkAzon, kulcsszo){
        await this.connection.returnNone(`DELETE CikkazonEsKulcsszo WHERE azon = :cikkAzon AND kulcsszo = :kulcsszo`,
        {
            cikkAzon: {val: Number(cikkAzon), dir: oracledb.BIND_IN, type: oracledb.NUMBER},
            kulcsszo: {val: String(kulcsszo), dir: oracledb.BIND_IN, type: oracledb.STRING}
        });
    }
}

module.exports = KulcsszoDAO;
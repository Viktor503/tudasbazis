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

    async getSameNyelvuCikkek(azon) {
        return await this.connection.returnMore(
            `
            SELECT azon, cim
            FROM Nyelvkapcsolat
            JOIN Cikk ON Nyelvkapcsolat.cikkAzon = Cikk.azon
            WHERE eredetiCikkAzon = :azon
            `,
            {
                azon: {
                    val: Number(azon),
                    dir: oracledb.BIND_IN,
                    type: oracledb.NUMBER,
                },
            }
        );
    }

    async getNyelvkapcsolat(azon) {
        return await this.connection.returnOne(
            `SELECT * FROM nyelvkapcsolat WHERE cikkazon = :azon`,
            {
                azon: {
                    val: Number(azon),
                    dir: oracledb.BIND_IN,
                    type: oracledb.NUMBER,
                },
            }
        )
    };
    async insertNyelvKapcsolat(cikkazon, nyelvazon) {
        await this.connection.returnNone(
            `INSERT INTO nyelvkapcsolat (cikkazon, nyelvazon) VALUES (:cikkazon, :nyelvazon)`,
            {
                cikkazon: {
                    val: Number(cikkazon),
                    dir: oracledb.BIND_IN,
                    type: oracledb.NUMBER,
                },
                nyelvazon: {
                    val: Number(nyelvazon),
                    dir: oracledb.BIND_IN,
                    type: oracledb.NUMBER,
                },
            }
            
        );
    }
    async changeEredetiCikk(azon, eredeticikkazon) {
        await this.connection.returnNone(
            `UPDATE nyelvkapcsolat SET eredeticikkazon = :eredeticikkazon WHERE cikkazon = :azon`,
            {
                azon: {
                    val: Number(azon),
                    dir: oracledb.BIND_IN,
                    type: oracledb.NUMBER,
                },
                eredeticikkazon: {
                    val: Number(eredeticikkazon),
                    dir: oracledb.BIND_IN,
                    type: oracledb.NUMBER,
                },
            });
    }

    async getEredetiCikkek() {
        return await this.connection.returnMore(
            `SELECT * FROM nyelvkapcsolat,cikk 
            WHERE nyelvkapcsolat.eredeticikkazon IS NULL and nyelvkapcsolat.cikkazon = cikk.azon
            `,{});
    }
}

module.exports = NyelvDAO;
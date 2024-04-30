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
    async getSameNyelvűCikkek(azon) {
        let res = await this.connection.returnOutBinds(
            `
            DECLARE
                eredetiazon nyelvkapcsolat.eredeticikkazon%TYPE;
            BEGIN
                SELECT nyelvkapcsolat.eredeticikkazon INTO eredetiazon FROM nyelvkapcsolat WHERE cikkazon = :azon;
                
                IF eredetiazon IS NULL THEN
                    OPEN :v_cursor FOR
                    SELECT * FROM CIKK WHERE AZON IN (SELECT nyelvkapcsolat.cikkazon FROM nyelvkapcsolat WHERE (cikkazon = :azon OR eredeticikkazon = :azon));
                    
                ELSE
                    OPEN :v_cursor FOR
                    SELECT * FROM CIKK WHERE AZON IN (SELECT nyelvkapcsolat.cikkazon FROM nyelvkapcsolat WHERE (cikkazon = eredetiazon OR eredeticikkazon = eredetiazon));
                END IF;
            END;
            `,
            { azon: { val: Number(azon), dir: oracledb.BIND_IN, type: oracledb.NUMBER },
                v_cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            }
        
        );
        res = await res.v_cursor.getRows();
        return res;
    }
}

module.exports = NyelvDAO;
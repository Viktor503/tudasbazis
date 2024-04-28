const oracledb = require("oracledb");

class CikkDAO {
    constructor(connection) {
        this.connection = connection;
    }

    async getAll() {
        return await this.connection.returnMore(`SELECT * FROM cikk`);
    }

    async getByAzon(azon) {
        return await this.connection.returnOne(
            `SELECT * FROM cikk WHERE azon = :azon`,
            {
                azon: {
                    val: Number(azon),
                    dir: oracledb.BIND_IN,
                    type: oracledb.NUMBER,
                },
            }
        );
    }

    async getMoreByAzonok(azon) {
        const inBindings = azon.map((val) => ({ val, dir: oracledb.BIND_IN, type: oracledb.NUMBER }));
        const placeholders = azon.map((_, index) => `:azon${index + 1}`).join(", ");
        const query = `SELECT * FROM cikk WHERE cikk.azon IN (${placeholders})`;
        const bindParams = inBindings.reduce((params, binding, index) => {
            params[`azon${index + 1}`] = binding;
            return params;
        }, {});
        return await this.connection.returnMore(query, bindParams);
    }

    async nyelvSzerint(){
        return await this.connection.returnMore(
            `
            SELECT cikk.cim,COUNT(cikk.azon) AS nyelvszám 
            FROM cikk,nyelvkapcsolat 
            WHERE(cikk.azon=nyelvkapcsolat.cikkazon) 
            GROUP BY cikk.cim 
            ORDER BY nyelvszám DESC
            `
        );
    }

    
    async getKulcsszavak(azon){
        var res = await this.connection.returnMore(
            `
            SELECT kulcsszo FROM KULCSSZO where azon in (SELECT kulcsszoazon from kulcsszokapcsolat WHERE cikkazon = :azon)
            `,{
                azon: { val: Number(azon), dir: oracledb.BIND_IN, type: oracledb.NUMBER }
            }
        );
        var res2 = [];
        res.forEach(element => {
            res2.push(element.KULCSSZO);
        });
        return res2;
    }


    async getHasonloAzon(id) {
        const cursor = await this.connection.returnOutBinds(
            `
            BEGIN
            :cursor := SUGGESTER(:id);
            END;
            `,{
                id: { val: Number(id), dir: oracledb.BIND_IN, type: oracledb.NUMBER },
                cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            }
        );
        const res = await cursor.cursor.getRows();
        var res2 = [];
        res.forEach(element => {
            res2.push(element.CIKKAZON);
        });
        return res2;
    }
    async getHasonlo(id) {
        const res = await this.getMoreByAzonok(await this.getHasonloAzon(id));
        if(res){
            return res;
        }else{
            return [];
        }
    }

    async getByCim(cim) {
        return await this.connection.returnMore(
            `SELECT * FROM cikk WHERE cim LIKE %:cim%`,
            {
                cim: { val: String(cim), dir: oracledb.BIND_IN, type: oracledb.STRING },
            }
        );
    }

    async getBySzerzoAzon(szerzoAzon) {
        return await this.connection.returnOne(
            `SELECT * FROM szerzo WHERE azon = :szerzoAzon`,
            {
                szerzoAzon: {
                    val: Number(szerzoAzon),
                    dir: oracledb.BIND_IN,
                    type: oracledb.NUMBER,
                },
            }
        );
    }

    async getByLektorAzon(lektorAzon) {
        return await this.connection.returnOne(
            `SELECT * FROM lektor WHERE azon = :lektorAzon`,
            {
                lektorAzon: {
                    val: Number(lektorAzon),
                    dir: oracledb.BIND_IN,
                    type: oracledb.NUMBER,
                },
            }
        );
    }

    async getByAllapot(allapot) {
        return await this.connection.returnOne(
            `SELECT * FROM cikk WHERE allapot = :allapot`,
            {
                allapot: {
                    val: Number(allapot),
                    dir: oracledb.BIND_IN,
                    type: oracledb.NUMBER,
                },
            }
        );
    }

    async getByModositasokSzama(modositasokSzama) {
        return await this.connection.returnMore(
            `SELECT * FROM cikk WHERE modositasokSzama = :modositasokSzama`,
            {
                modositasokSzama: {
                    val: Number(modositasokSzama),
                    dir: oracledb.BIND_IN,
                    type: oracledb.NUMBER,
                },
            }
        );
    }

    async getByTartalom(tartalom) {
        return await this.connection.returnMore(
            `SELECT * FROM cikk WHERE tartalom LIKE %:tartalom%`,
            {
                tartalom: {
                    val: String(tartalom),
                    dir: oracledb.BIND_IN,
                    type: oracledb.CLOB,
                },
            }
        );
    }

    async insertCikk(
        cim,
        szerzoAzon,
        tartalom
    ) {
        await this.connection.returnNone(
            `INSERT INTO cikk (cim, szerzoAzon, tartalom) VALUES 
      (:cim, :szerzoAzon, to_clob(:tartalom))`,
            {
                cim: { val: String(cim), dir: oracledb.BIND_IN, type: oracledb.STRING },
                szerzoAzon: {
                    val: Number(szerzoAzon),
                    dir: oracledb.BIND_IN,
                    type: oracledb.NUMBER,
                },
                tartalom: {
                    val: String(tartalom),
                    dir: oracledb.BIND_IN,
                    type: oracledb.STRING,
                },
            }
        );
    }

    async deleteCikk(azon) {
        await this.connection.returnNone(`DELETE FROM cikk WHERE azon = :azon`, {
            azon: { val: Number(azon), dir: oracledb.BIND_IN, type: oracledb.NUMBER },
        });
    }

    async updateCikk(azon, cim, tartalom) {
        await this.connection.returnNone(
            `UPDATE cikk SET cim = :cim, tartalom = to_clob(:tartalom) WHERE azon = :azon`,
            {
                azon: { val: Number(azon), dir: oracledb.BIND_IN, type: oracledb.NUMBER },
                cim: { val: String(cim), dir: oracledb.BIND_IN, type: oracledb.STRING },
                tartalom: {
                    val: String(tartalom),
                    dir: oracledb.BIND_IN,
                    type: oracledb.STRING,
                },
            }
        );
    }
}

module.exports = CikkDAO;

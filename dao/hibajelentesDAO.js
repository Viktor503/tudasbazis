const oracledb = require("oracledb");
const bcrypt = require("bcrypt");

class HibajelentesDAO {
  constructor(connection) {
    this.connection = connection;
  }

  async getAll() {
    return await this.connection.returnMore(`SELECT * FROM hibajelentes`);
  }

  async getByAzon(azon) {
    return await this.connection.returnOne(
      `SELECT * FROM hibajelentes WHERE azon = :azon`,
      {
        azon: {
          val: Number(azon),
          dir: oracledb.BIND_IN,
          type: oracledb.NUMBER,
        },
      }
    );
  }

  async getByBejelento(bejelento) {
    return await this.connection.returnMore(
      `SELECT * FROM felhasznalo WHERE azon = :bejelento`,
      {
        bejelento: {
          val: Number(bejelento),
          dir: oracledb.BIND_IN,
          type: oracledb.NUMBER,
        },
      }
    );
  }

  async getByCikkAzon(cikkAzon) {
    return await this.connection.returnOne(
      `SELECT * FROM cikk WHERE azon = :cikkAzon`,
      {
        cikkAzon: {
          val: Number(cikkAzon),
          dir: oracledb.BIND_IN,
          type: oracledb.NUMBER,
        },
      }
    );
  }

  async getByAktiv(aktiv) {
    return await this.connection.returnMore(
      `SELECT * FROM hibajelentes WHERE aktiv = :aktiv`,
      {
        aktiv: {
          val: Number(aktiv),
          dir: oracledb.BIND_IN,
          type: oracledb.NUMBER,
        },
      }
    );
  }

  async getByDatum(datum) {
    return await this.connection.returnMore(
      `SELECT * FROM hibajelentes WHERE datum = :datum`,
      {
        datum: {
          val: Date(datum).getTime(),
          dir: oracledb.BIND_IN,
          type: oracledb.DB_TYPE_TIMESTAMP,
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

  async insertHibajelentes(bejelento, cikkAzon, datum, tartalom) {
    await this.connection.returnNone(
      `INSERT INTO hibajelentes (bejelento, cikkAzon, datum, tartalom) VALUES (:bejelento, :cikkAzon, to_timestamp(:datum), to_clob(:tartalom))`,
      {
        bejelento: {
          val: Number(bejelento),
          dir: oracledb.BIND_IN,
          type: oracledb.NUMBER
        },
        cikkAzon: {
          val: Number(cikkAzon),
          dir: oracledb.BIND_IN,
          type: oracledb.NUMBER
        },
        datum: {
          val: datum,
          dir: oracledb.BIND_IN,
          type: oracledb.DATE
        },
        tartalom: {
          val: String(tartalom),
          dir: oracledb.BIND_IN,
          type: oracledb.STRING,
      },
      }
    );
  }
  
  async deactivateHibajelentes(azon) {
    await this.connection.returnNone(
      `UPDATE hibajelentes SET aktiv = 0 WHERE azon = :azon`,
      {
        azon: {
          val: Number(azon),
          dir: oracledb.BIND_IN,
          type: oracledb.NUMBER,
        },
      }
    );
  }

}

module.exports = HibajelentesDAO;
const oracledb = require("oracledb");
const bcrypt = require("bcrypt");

class FelhasznaloDAO {
  constructor(connection) {
    this.connection = connection;
  }

  async getAll() {
    return await this.connection.returnMore(`SELECT * FROM felhasznalo`);
  }

  async getByAzon(azon) {
    return await this.connection.returnOne(
      `SELECT * FROM felhasznalo WHERE azon = :azon`,
      {
        azon: {
          val: Number(azon),
          dir: oracledb.BIND_IN,
          type: oracledb.NUMBER,
        },
      }
    );
  }

  async getByNev(nev) {
    return await this.connection.returnOne(
      `SELECT * FROM felhasznalo WHERE nev LIKE :nev`,
      {
        nev: { val: String(nev), dir: oracledb.BIND_IN, type: oracledb.STRING },
      }
    );
  }

  async getByAdmin(admin) {
    return await this.connection.returnMore(
      `SELECT * FROM felhasznalo WHERE admin = :admin`,
      {
        admin: {
          val: Number(admin),
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

  async getLektorok() {
    return await this.connection.returnMore(`SELECT * FROM felhasznalo WHERE lektorazon IS NOT NULL ORDER BY lektorazon DESC`);
  }

  async insertFelhasznalo(nev, jelszo) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(jelszo, salt);

    await this.connection.returnNone(
      `INSERT INTO felhasznalo(nev, jelszo) VALUES (:nev, :hash)`,
      {
        nev: { val: String(nev), dir: oracledb.BIND_IN, type: oracledb.STRING },
        hash: {
          val: String(hash),
          dir: oracledb.BIND_IN,
          type: oracledb.STRING,
        }        
      }
    );
  }

  async deleteFelhasznalo(azon) {
    await this.connection.returnNone(
      `DELETE FROM felhasznalo WHERE azon = :azon`,
      {
        azon: {
          val: Number(azon),
          dir: oracledb.BIND_IN,
          type: oracledb.NUMBER,
        },
      }
    );
  }

  async updateFelhasznalo(azon, jelszo) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(jelszo, salt);

    await this.connection.returnNone(
      `UPDATE felhasznalo SET jelszo = :hash WHERE azon = :azon`,
      {
        azon: {
          val: Number(azon),
          dir: oracledb.BIND_IN,
          type: oracledb.NUMBER,
        },
        hash: {
          val: String(hash),
          dir: oracledb.BIND_IN,
          type: oracledb.STRING,
        },
      }
    );
  }

  async updateFelhasznaloLektor(azon, lektorAzon) {
    await this.connection.returnNone(
      `UPDATE felhasznalo SET lektorazon = :lektorAzon WHERE azon = :azon`,
      {
        azon: {
          val: Number(azon),
          dir: oracledb.BIND_IN,
          type: oracledb.NUMBER,
        },
        lektorAzon: {
          val: lektorAzon?Number(lektorAzon):null,
          dir: oracledb.BIND_IN,
          type: oracledb.NUMBER,
        },
      });
    }
  async updateFelhasznaloAdmin(azon, admin) {
    await this.connection.returnNone(
      `UPDATE felhasznalo SET admin = :admin WHERE azon = :azon`,
      {
        azon: {
          val: Number(azon),
          dir: oracledb.BIND_IN,
          type: oracledb.NUMBER,
        },
        admin: {
          val: Number(admin),
          dir: oracledb.BIND_IN,
          type: oracledb.NUMBER,
        },
      });
    }
};

module.exports = FelhasznaloDAO;

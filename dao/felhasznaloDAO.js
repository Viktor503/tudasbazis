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
    return await this.connection.returnMore(
      `SELECT * FROM felhasznalo WHERE nev LIKE %:nev%`,
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

  async insertFelhasznalo(nev, jelszo, admin, lektorAzon) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(jelszo, salt);

    await this.connection.returnNone(
      `INSERT INTO felhasznalo(nev, jelszo, admin, lektorAzon) VALUES (:nev, :hash, :admin, :lektorAzon)`,
      {
        nev: { val: String(nev), dir: oracledb.BIND_IN, type: oracledb.STRING },
        hash: {
          val: String(hash),
          dir: oracledb.BIND_IN,
          type: oracledb.STRING,
        },
        admin: {
          val: Number(admin),
          dir: oracledb.BIND_IN,
          type: oracledb.NUMBER,
        },
        lektorAzon: {
          val: Number(lektorAzon),
          dir: oracledb.BIND_IN,
          type: oracledb.NUMBER,
        },
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

  async newUser(values) {
    values = "'" + values[0] + "','" + values[1] + "'";
    const columns = "nev" + "," + "jelszo";
    return await this.connection.insertWithColumns(
      "felhasznalo",
      columns,
      values
    );
  }
}

module.exports = FelhasznaloDAO;

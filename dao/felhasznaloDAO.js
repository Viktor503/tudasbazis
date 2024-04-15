const oracledb = require('oracledb');

class FelhasznaloDAO{
    constructor(connection){
        this.connection = connection;
    }

    async getAll(){
        return await this.connection.selectAll("felhasznalo");
    }

    async getByAzon(azon){
        return await this.connection.selectOne(`SELECT * FROM felhasznalo WHERE azon = :azon`, {azon: {val: Number(azon), dir: oracledb.BIND_IN, type: oracledb.NUMBER}});
    }

    async getByNev(nev){
        return await this.connection.selectOne(`SELECT * FROM felhasznalo WHERE nev = :nev`, {nev: {val: String(nev), dir: oracledb.BIND_IN, type: oracledb.STRING}});
    }

    async getByNev(nev){
        return await this.connection.selectOne(`SELECT * FROM felhasznalo WHERE nev = '${nev}'`);
    }

    async newUser(values){
        values = "\'"+values[0]+"\',\'"+values[1]+"\'";
        const columns = "nev"+","+"jelszo";
        return await this.connection.insertWithColumns("felhasznalo", columns, values);
    }
}

module.exports = FelhasznaloDAO;
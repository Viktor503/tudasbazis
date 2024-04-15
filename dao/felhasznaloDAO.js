class FelhasznaloDAO{
    constructor(connection){
        this.connection = connection;
    }

    async getAll(){
        return await this.connection.selectAll("felhasznalo");
    }

    async getByAzon(azon){
        return await this.connection.selectOne(`SELECT * FROM felhasznalo WHERE azon = ${azon}`);
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
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
}

module.exports = FelhasznaloDAO;
const oracledb = require('oracledb');

class LektorDAO{
    constructor(connection){
        this.connection = connection;
    }

    async getAll(){
        return await this.connection.returnMore(`SELECT * FROM lektor`);
    }

    async getByAzon(azon){
        return await this.connection.returnOne(`SELECT * FROM lektor WHERE azon = :azon`, {azon: {val: Number(azon), dir: oracledb.BIND_IN, type: oracledb.NUMBER}});
    }

    async getByFokozat(fokozat){
        return await this.connection.returnMore(`SELECT * FROM lektor WHERE fokozat = :fokozat`, {fokozat: {val: String(fokozat), dir: oracledb.BIND_IN, type: oracledb.STRING}});
    }

    async getByIntezet(intezet){
        return await this.connection.returnMore(`SELECT * FROM lektor WHERE intezet = :intezet`, {intezet: {val: String(intezet), dir: oracledb.BIND_IN, type: oracledb.STRING}});
    }

    async getBySzakterulet(szakterulet){
        return await this.connection.returnMore(`SELECT * FROM lektor WHERE szakterulet = :szakterulet`, {szakterulet: {val: String(intezet), dir: oracledb.BIND_IN, type: oracledb.STRING}});
    }

    async insertLektor(fokozat, intezet, szakterulet){
        await this.connection.returnNone(`INSERT INTO lektor (fokozat, intezet, szakterulet) VALUES (:fokozat, :intezet, :szakterulet)`, {fokozat: {val: String(fokozat), dir: oracledb.BIND_IN, type: oracledb.STRING}, intezet: {val: String(intezet), dir: oracledb.BIND_IN, type: oracledb.STRING}, szakterulet: {val: String(szakterulet), dir: oracledb.BIND_IN, type: oracledb.STRING}});
    }

    async getLatestAzon(){
        return await this.connection.returnOne(`SELECT MAX(azon) FROM lektor`);
    }

    async deleteLektor(azon){
        await this.connection.returnNone(`DELETE FROM lektor WHERE azon = :azon`, {azon: {val: Number(azon), dir: oracledb.BIND_IN, type: oracledb.NUMBER}});
    }

    async updateLektor(azon, fokozat, intezet, szakterulet){
        await this.connection.returnNone(`UPDATE lektor SET fokozat = :fokozat, intezet = :intezet, szakterulet = :szakterulet WHERE azon = :azon`, {azon: {val: Number(azon), dir: oracledb.BIND_IN, type: oracledb.NUMBER}, fokozat: {val: String(fokozat), dir: oracledb.BIND_IN, type: oracledb.STRING}, intezet: {val: String(intezet), dir: oracledb.BIND_IN, type: oracledb.STRING}, szakterulet: {val: String(szakterulet), dir: oracledb.BIND_IN, type: oracledb.STRING}});
    }

    async getSzakteruletAmount(){
        return await this.connection.returnMore(
        `SELECT L.szakterulet, COUNT(*) AS LektorokSzama
        FROM Lektor L
        GROUP BY L.szakterulet
        ORDER BY LektorokSzama DESC`);
    }

    async getAllWithNev(){
        return await this.connection.returnMore(
        `SELECT L.azon, L.fokozat, L.intezet, L.szakterulet, F.nev
        FROM Lektor L
        JOIN Felhasznalo F ON L.azon = F.lektorazon`);
    }
}

module.exports = LektorDAO;
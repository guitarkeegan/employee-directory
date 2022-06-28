const connection = require('./connection')

class DataBase{
    constructor(connection){
        this.db = connection;
    }
    
    getDepartments () {
        let sqlStr = `
        SELECT *
        FROM department`

        return this.db.promise().query(sqlStr);
    }
}

module.exports = new DataBase(connection);
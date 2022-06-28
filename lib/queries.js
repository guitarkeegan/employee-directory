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

    getRoles() {
        let sqlStr = `
        SELECT *
        FROM role`
        return this.db.promise().query(sqlStr);
    }

    getEmployees(){
        let sqlStr = `
        SELECT *
        FROM employee`
        return this.db.promise().query(sqlStr);
    }

    addDepartment(deptName){
        let sqlStr = `
        INSERT INTO department(name)
        VALUES ("${deptName}")`
        return this.db.promise().query(sqlStr);
    }
}

module.exports = new DataBase(connection);
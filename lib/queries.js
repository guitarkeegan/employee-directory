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
    addDepartment(dept){
        let sqlStr = `
        INSERT INTO department(name)
        VALUES ("${dept}")`
        return this.db.promise().query(sqlStr);
    }
    addRole(role, dept, salary){
        let sqlStr = `
        INSERT INTO role(title, salary, department_id)
        VALUES ("${role}", "${dept}", ${salary})`
        return this.db.promise().query(sqlStr);
    }
    getDepartmentId(deptName){
        let sqlStr = `
        SELECT id
        FROM department
        WHERE name = "${deptName}"`
        return this.db.promise().query(sqlStr);
    }
    addEmployee(fName, lName, roleId, managerId){
        let sqlStr = `
        INSERT INTO employee(first_name, last_name, role_id, manager_id)
        VALUES ( "${fName}", "${lName}", ${roleId}, ${managerId} )`
        return this.db.promise().query(sqlStr);
    }
}

module.exports = new DataBase(connection);
const connection = require('./connection')

class DataBase{
    constructor(connection){
        this.db = connection;
    }
    getDepartments () {
        let sqlStr = `
        SELECT d.id,  d.name AS departments
        FROM department d`
        return this.db.promise().query(sqlStr);
    }
    getRoles() {
        let sqlStr = `
        SELECT role.id, role.title, department.name AS department, role.salary
        FROM role
        JOIN department ON role.department_id = department.id`
        return this.db.promise().query(sqlStr);
    }
    getEmployees(){// TODO get manager name to show
        let sqlStr = `
        SELECT e.id, e.first_name, e.last_name, role.title AS role_title, department.name AS department, role.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employee e
        LEFT JOIN employee m ON e.manager_id = m.id
        JOIN role ON e.role_id = role.id
        JOIN department ON role.department_id = department.id
        ORDER BY e.id`
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
    getRoleChoicesList(){
        let sqlStr = `
        SELECT r.id, r.title
        from role r`
        return this.db.promise().query(sqlStr);
    }
    addEmployee(fName, lName, roleId, managerId){
        let sqlStr = `
        INSERT INTO employee(first_name, last_name, role_id, manager_id)
        VALUES ( "${fName}", "${lName}", ${roleId}, ${managerId} )`
        return this.db.promise().query(sqlStr);
    }
    updateEmployeeRole(employeeId, newRoleId){
        let sqlStr = `
        UPDATE employee
        SET role_id = ${newRoleId}
        WHERE id = ${employeeId}`
        return this.db.promise().query(sqlStr);
    }
}

module.exports = new DataBase(connection);
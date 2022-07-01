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
        SELECT role.id AS role_id, role.title, department.name AS department, role.salary
        FROM role
        JOIN department ON role.department_id = department.id`
        return this.db.promise().query(sqlStr);
    }
    getEmployees(){
        let sqlStr = `
        SELECT e.id, e.first_name, e.last_name, role.title AS role_title, department.name AS department, role.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employee e
        LEFT JOIN employee m ON e.manager_id = m.id
        JOIN role ON e.role_id = role.id
        JOIN department ON role.department_id = department.id
        ORDER BY e.id`
        return this.db.promise().query(sqlStr);
    }
    // getEmployeesMin(){
    //     let sqlStr = `
    //     SELECT e.id AS employee_id, CONCAT(e.first_name, ' ', e.last_name) AS employee_name, e.manager_id AS manager_id, CONCAT(m.first_name, ' ', m.last_name) AS manager
    //     FROM employee e
    //     LEFT JOIN employee m ON e.manager_id = m.id`
    //     return this.db.promise().query(sqlStr);
    // }
    // getEmployeeId(...names){
        
        // search for names

    // }
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
    updateEmployeeManager(employeeId, managerId){
        let sqlStr = `
        UPDATE employee
        SET manager_id = ${managerId}
        WHERE id = ${employeeId}`
        return this.db.promise().query(sqlStr);
    }
    deleteDepartment(id){
        let sqlStr = `
        DELETE FROM department
        WHERE id = ${id}`
        return this.db.promise().query(sqlStr);
    }
    getManagers(){
        let sqlStr = `
        SELECT id, CONCAT(first_name, ' ', last_name) AS manager_name, manager_id
        FROM employee e
        `
        return this.db.promise().query(sqlStr);
    }
    getEmployeeRoleInfo(){
        let sqlStr = `
        SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS employee_name, e.role_id, r.title AS role
        FROM employee e
        JOIN role r ON e.role_id = r.id
        GROUP BY e.id`
        return this.db.promise().query(sqlStr);
    }
    getEmployeeManagerInfo(){
        let sqlStr = `
        SELECT e.id AS employee_id, CONCAT(e.first_name, ' ', e.last_name) AS employee_name, e.manager_id, CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employee e
        LEFT JOIN employee m ON e.manager_id = m.id`
        return this.db.promise().query(sqlStr);
    }
}

module.exports = new DataBase(connection);
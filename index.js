require('dotenv').config()
const inquirer = require('inquirer');
const db = require('./lib/queries')
const cTable = require('console.table');
const {addDepartmentQuestions, addRoleQuestions, addEmployeeQuestions} = require('./lib/questions');

mainMenuQuestions = [
    {
        type: "list",
        name: "view",
        choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an Employee", "Update an employee role"]
    }
]

function mainMenu(){
    inquirer.prompt(mainMenuQuestions)
    .then(answers=>{
        switch (answers.view) {
            case "View all departments":
                viewDept();
                break;
            case "View all roles":
                viewRoles();
                break;
            case "View all employees":
                viewEmployees();
                break;
            case "Add a department":
                getDepartmentQuestion();
                break;
            case "Add a role":
                getRoleQuestions();
                break;
            case "Add an Employee":
                getEmployeeQuestions();
                break;
            case "Update an employee role":
                break;
            default:
                break;
        }
    })
}

async function viewDept() {
    // db.getDepartments()
    // .then(([rows]) => {
    //     // console.log(info)
    //     console.table(rows);
    //     mainMenu()
    // })
    const [rows] = await db.getDepartments();
    console.table(rows)
    mainMenu()
}

async function viewRoles() {
    const [rows] = await db.getRoles();
    console.table(rows);
    mainMenu();
}

async function viewEmployees(){
    const [rows] = await db.getEmployees();
    console.table(rows);
    mainMenu();
}

function getDepartmentQuestion(){
    inquirer.prompt(addDepartmentQuestions)
    .then(answers=>{
        db.addDepartment(answers.deptName);
        mainMenu();
})
}

async function getRoleQuestions(){

    const [rows] = await db.getDepartments();
    console.table(rows)

    inquirer.prompt(addRoleQuestions)
    .then(answers=>{
        const {deptId, roleName, salary} = answers;
            db.addRole(roleName, salary, deptId);
            mainMenu();
        })
}

async function getEmployeeQuestions(){
    // make employees array to check if manager_id exists
    const [erows] = await db.getEmployees();
    const empArr = erows.map(item=>item.manager_id);
    // make roles array to check if roles_id exists
    const [rrows] = await db.getRoles();
    const rolesArr = rrows.map(item=>item.id);

    inquirer.prompt(addEmployeeQuestions)
    .then(answers=>{
        const {fName, lName, role, isManager, managerId} = answers;
        if (empArr.includes(parseInt(managerId)) && rolesArr.includes(parseInt(role))){
            let mId;
            if (isManager == "true"){
                mId = null;
            } else {
                mId = managerId;
            }
            db.addEmployee(fName, lName, role, mId);
            console.log(`${fName} ${lName} was added to database`);
            mainMenu();
        } else {
            console.log("Manager ID or Role ID does not exist, please double check the IDs for both.")
            mainMenu();
        }
    })
}
// async function initDepartments(){
//     const [rows] = await db.getDepartments();
//     // console.log(rows);
//     rows.map(dept=>allDepartments.push(dept));
// }

// initDepartments()

mainMenu()


// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 


// Update employee managers.

// View employees by manager.

// View employees by department.

// Delete departments, roles, and employees.

// View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.
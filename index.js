require('dotenv').config()
const inquirer = require('inquirer');
const db = require('./lib/queries')
const cTable = require('console.table');
const {addDepartmentQuestions, addRoleQuestions, addEmployeeQuestions, updateEmployeeRoleQuestions} = require('./lib/questions');

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
                getUpdateEmployeeQuestions();
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
        console.log(`\n-- new department was added! --\n`);
        mainMenu();
})
}

async function getRoleQuestions(){

    const [rows] = await db.getDepartments();
    console.table(rows)
    const deptArr = rows.map(item=>item.id);

    inquirer.prompt(addRoleQuestions)
    .then(answers=>{
        const {deptId, roleName, salary} = answers;
        if (deptArr.includes(parseInt(deptId) && roleName.length < 60)){
            db.addRole(roleName, salary, deptId);
            console.log(`\n-- Role was successfully added to database! --\n`);
            mainMenu();
        } else {
            console.log(`\n-- Error adding to database. Please varify the department ID and that the role name is less than 60 characters. --\n `)
            mainMenu();
        }
        
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
        console.log(answers);
        let {fName, lName, role, isManager} = answers;

        if (isManager !== ""){
            if (empArr.includes(parseInt(managerId)) && rolesArr.includes(parseInt(role))){
            
                db.addEmployee(fName, lName, role, isManager);
                console.log(`${fName} ${lName} was added to database`);
                mainMenu();
            } else {
                console.log("\n -- Manager ID or Role ID does not exist, please double check the IDs for both. --\n")
                mainMenu();
            }
        } else {
            isManager = null;
            if (rolesArr.includes(parseInt(role))){
                db.addEmployee(fName, lName, role, isManager);
                console.log(`\n-- ${fName} ${lName} was added to database --\n`);
                mainMenu();
            }
        }

       
    })
}

async function getUpdateEmployeeQuestions(){

    const [rows] = await db.getEmployees();
    const empIdArr = rows.map(item=>item.id);
    const empArr = [...rows];

    const [rrows] = await db.getRoles();
    const rolesIdArr = rrows.map(item=>item.id);
    const rolesArr = [...rrows];

    inquirer.prompt(updateEmployeeRoleQuestions)
    .then(answers=>{
        const {empId, newRole} = answers;
        const eId = parseInt(empId);
        const nRole = parseInt(newRole);
        if (empIdArr.includes(eId) && rolesIdArr.includes(nRole)){
            db.updateEmployeeRole(eId, nRole);
            const empIndex = empIdArr.indexOf(eId);
            const rIndex = rolesIdArr.indexOf(nRole);
            console.log(`${empArr[empIndex].first_name} ${empArr[empIndex].last_name}'s role has been changed to ${rolesArr[rIndex].title}`);
            mainMenu();
        } else {
            console.log("Either the employee number or the role ID is incorrect.");
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
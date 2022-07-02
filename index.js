require('dotenv').config()
var figlet = require('figlet');
const inquirer = require('inquirer');
const db = require('./lib/queries')
const cTable = require('console.table');
const {addDepartmentQuestions, addEmployeeQuestions, addRoleQuestions, updateEmployeeRoleQuestions, deleteDepartmentQuestions, updateEmployeeManagerQuestions, deleteEmpQuestions, deleteRoleQuestions, empByDeptQuestions, empByManagerQuestion, totalUtilizedBudgetQuestion} = require('./lib/questions');
const { getTotalUtilizedBudget } = require('./lib/queries');

mainMenuQuestions = [
    {
        type: "list",
        name: "view",
        choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Update employee manager", "Delete department", "Delete role", "Delete employee", "View employees by department", "View employees by manager", "View total budget utilization", "Quit"]
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
            case "Add an employee":
                getEmployeeQuestions();
                break;
            case "Update an employee role":
                getUpdateEmployeeQuestions();
                break;
            case "Update employee manager":
                getUpdateEmployeeManagerQuestions();
                break;
            case "Delete department":
                getDeleteDeptQuestions();
                break;
            case "Delete role":
                getDeleteRoleQuestions();
                break;
            case "Delete employee":
                getDeleteEmpQuestions();
                break;
            case "View employees by department":
                getEmpByDeptQuestion();
                break;
            case "View employees by manager":
                getEmpByManagerQuestion();
                break;
            case "View total budget utilization":
                getTotalUtilizedBudgetQuestion();
                break;
            case "Quit":
                exit();
                break;
                
            default:
                console.error("You missed something in the switch statement");
        }
    })
}


async function viewDept() {
    console.clear();
    const [rows] = await db.getDepartments();
    console.table(rows)
    mainMenu()
}


async function viewRoles() {
    console.clear();
    const [rows] = await db.getRoles();
    console.table(rows);
    mainMenu();
}


async function viewEmployees(){
    console.clear();
    const [rows] = await db.getEmployees();
    console.table(rows);
    mainMenu();
}


async function getDepartmentQuestion(){
    console.clear();
    const [rows] = await db.getDepartments();
    const deptNamesArr = rows.map(dept=>dept.name);
    
    console.table(rows)

    inquirer.prompt(addDepartmentQuestions)
    .then(answers=>{
        const {deptName} = answers;
        if (!deptNamesArr.includes(deptName)){
            db.addDepartment(deptName);
            console.clear();
            console.log(`\n-- New department was added! --\n`);
            mainMenu();
        } else {
            console.clear();
            console.log(`\n-- Department name already exists --\n`);
            mainMenu();
        }
})
}


async function getRoleQuestions(){
    console.clear();
    const [rows] = await db.getDepartments();
    console.table(rows)
    const deptArr = rows.map(item=>item.id);

    inquirer.prompt(addRoleQuestions)
    .then(answers=>{
        const {deptId, roleName, salary} = answers;
        if (deptArr.includes(parseInt(deptId)) && roleName.length < 60){
            db.addRole(roleName, parseInt(salary), parseInt(deptId));
            console.clear();
            console.log(`\n-- Role was successfully added to database! --\n`);
            mainMenu();
        } else {
            console.clear();
            console.log(`\n-- Error adding to database. Please varify the department ID and that the role name is less than 60 characters. --\n `)
            mainMenu();
        }
        })
}


async function getEmployeeQuestions(){
    console.clear();
    // show managers to get their IDs
    const [drows] = await db.getEmployeesByDepartment(3);
        console.table(drows);
    //show roles so that user can see ID numbers
    const [roleRows] = await db.getRoles();
    console.table(roleRows);
    // make employees array to check if manager_id exists
    const [erows] = await db.getManagers();
    const empArr = erows.map(e=>e.manager_id);
    // make roles array to check if roles_id exists
    const [rrows] = await db.getRoles();
    const rolesArr = rrows.map(item=>item.role_id);
    

    inquirer.prompt(addEmployeeQuestions)
    .then(answers=>{
        let {fName, lName, role, isManager} = answers;

        if (isManager !== ""){
            if (empArr.includes(parseInt(isManager)) && rolesArr.includes(parseInt(role))){
            
                db.addEmployee(fName, lName, parseInt(role), parseInt(isManager));
                console.clear();
                console.log(`\n--${fName} ${lName} was added to database--\n`);
                mainMenu();
            } else {
                console.clear();
                console.log("\n -- Manager ID or Role ID does not exist, please double check the IDs for both. --\n")
                mainMenu();
            }
        } else {
            isManager = null;
            if (rolesArr.includes(parseInt(role))){
                db.addEmployee(fName, lName, parseInt(role), isManager);
                console.clear();
                console.log(`\n-- ${fName} ${lName} was added to database --\n`);
                mainMenu();
            } else {
                console.clear();
                console.error("\n --Role was not found --\n");
                mainMenu();
            }
        }

       
    })
}


async function getUpdateEmployeeQuestions(){
    console.clear();
    // show info to update employee role
    const [mrows] = await db.getEmployeeRoleInfo();
    const empIdsArr = mrows.map(emp=>emp.id);
    const rolesIdArr = mrows.map(emp=>emp.role_id);
    console.table(mrows);

    inquirer.prompt(updateEmployeeRoleQuestions)
    .then(answers=>{
        const {empId, newRole} = answers;
        const eId = parseInt(empId);
        const nRole = parseInt(newRole);
        if (empIdsArr.includes(eId) && rolesIdArr.includes(nRole)){
            db.updateEmployeeRole(eId, nRole);
            const empIndex = empIdsArr.indexOf(eId);
            const rIndex = rolesIdArr.indexOf(nRole);
            console.clear();
            console.log(`\n--${mrows[empIndex].employee_name}'s role has been changed to ${mrows[rIndex].role}--\n`);
            mainMenu();
        } else {
            console.clear();
            console.log("\n-- Either the employee number or the role ID is incorrect.--\n");
            mainMenu();
        }
    })   
}


async function getUpdateEmployeeManagerQuestions(){

    const [rows] = await db.getEmployeeManagerInfo();
    const idArr = rows.map(emp=>emp.employee_id);

    const manIdArr = rows.map(man=>man.manager_id);
    console.table(rows);

    inquirer.prompt(updateEmployeeManagerQuestions)
    .then(answers=>{
        const {empId, newManager} = answers;
        const eId = parseInt(empId);
        const mId = parseInt(newManager);
        if (idArr.includes(eId)){
            if (manIdArr.includes(mId)){
                db.updateEmployeeManager(eId, mId)
                
                console.clear();
                console.log(`--\nChanged Employee's Manager!--\n`);
                mainMenu();
            } else {
                console.clear();
                console.error("\n-- The ID for the manager was not in the database.--\n");
                mainMenu();
            }
        } else {
            console.clear();
            console.error("\n-- The ID you entered did not match any employees. --\n");
            mainMenu();
        }
    });
}


async function getDeleteDeptQuestions(){
    console.clear();

    const [rows] = await db.getDepartments();
    const deptIdArr = rows.map(rows=>rows.id);
    console.table(rows);

    inquirer.prompt(deleteDepartmentQuestions)
    .then(answers=>{
        const {dept} = answers;
        const deptInt = parseInt(dept)
        if (deptIdArr.includes(deptInt)){
            db.deleteDepartment(deptInt);
            console.clear();
            console.log(`\n-- Department was successfully deleted! --\n`);
            mainMenu();
        } else {
            console.clear();
            console.log(`\n-- Department ID was not found --\n`);
            mainMenu();
        }
        
    });
}


async function getDeleteRoleQuestions(){
    console.clear();

    const [rows] = await db.getRoles();
    const rolesArr = rows.map(role=>role.role_id);
    console.table(rows);

    inquirer.prompt(deleteRoleQuestions)
    .then(answers=>{
        const {role} = answers;
        const roleInt = parseInt(role);
        if (rolesArr.includes(roleInt)){
            db.deleteRole(roleInt);
            console.clear();
            console.log(`\n-- Role was successfully deleted! --\n`);
            mainMenu();
        } else {
            console.clear();
            console.log(`\n-- Role ID was not found --\n`);
            mainMenu();
        }
       
    });
}
async function getDeleteEmpQuestions(){
    console.clear();

    const [rows] = await db.getEmployees();
    const empArr = rows.map(emp=>emp.id)
    console.table(rows);

    inquirer.prompt(deleteEmpQuestions)
    .then(answers=>{
        const {emp} = answers;
        const empInt = parseInt(emp);
        if (empArr.includes(empInt)){
            db.deleteEmp(empInt);
            console.clear();
            console.log(`\n-- Employee was successfully deleted! --\n`);
            mainMenu();
        } else {
            console.clear();
            console.log(`\n-- Employee ID was not found --\n`);
            mainMenu();
        }
       
    });
}


async function getEmpByDeptQuestion(){
    const [rows] = await db.getDepartments();
    const deptArr = rows.map(dept=>dept.id);
    console.table(rows);
    inquirer.prompt(empByDeptQuestions)
    .then(async answer=>{
        const {dept} = answer;
        const deptInt = parseInt(dept);
        if (deptArr.includes(deptInt)){
            console.clear();
            const [rows] = await db.getEmployeesByDepartment(deptInt);
            console.table(rows);
            mainMenu();
        } else {
            console.clear();
            console.log(`\n-- Department ID was not found --\n`);
            mainMenu();
        }
       
    })
    .catch(err=>{
        if (err){
            console.clear();
            console.error(err);
            mainMenu();
        }
    })
}


async function getEmpByManagerQuestion(){
    const [rows] = await db.getAllManagers()
    console.table(rows);

    inquirer.prompt(empByManagerQuestion)
    .then(async answer=>{
        const {manager} = answer;
        console.clear();
        const [rows] = await db.getEmpsByManager(parseInt(manager));
        console.table(rows);
        mainMenu();
    })
}


async function getTotalUtilizedBudgetQuestion(){
    console.clear();
    const [rows] = await db.getDepartments();
    console.table(rows)

    inquirer.prompt(totalUtilizedBudgetQuestion)
    .then(async answer=>{
        const {dept} = answer;
        const [rows] = await db.getTotalUtilizedBudget(parseInt(dept));
        const salariesArr = rows.map(salary=>parseInt(salary.salary));
        const initialValue = 0;
        const sumWithInitial = salariesArr.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        initialValue);
        let sumWithCommas = sumWithInitial.toLocaleString("en-US");
        console.log(`\n -- The total budget utilized for this department is $${sumWithCommas} --\n`)
        mainMenu();
    })
    .catch(err=>{
        if (err){
            console.error(err);
        }
    })
}

function exit(){
    process.exit();
}


// async function initDepartments(){
//     const [rows] = await db.getDepartments();
//     // console.log(rows);
//     rows.map(dept=>allDepartments.push(dept));
// }

// initDepartments()
console.log(figlet.textSync('Company\nDirectory\n', {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true
}));

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
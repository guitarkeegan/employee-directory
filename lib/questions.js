const db = require('../lib/queries');
const addDepartmentQuestions = [
    {
        type: "input",
        name: "deptName",
        message: "What is the new department called? ",
        validate: value=>{
            if (value){
                return true;
            } else {
                return "Must give a new department title. "
            }
        }
    }
]

const addRoleQuestions = [
    // {
    //     type: "list",
    //     name: "role",
    //     message: "Choose the role that you would like to add. ",
    //     choices: roleChoice
    // }
    {
        type: "input",
        name: "roleName",
        message: "What is the new role called? ",
        validate: value=>{
            if (value){
                return true;
            } else {
                return "Must define a new role"
            }
        }
    }, 
    {
        type: "input",
        name: "deptId",
        message: "Which department is the role in? (use the id) ",
        validate: value=>{
            const number = !isNaN(value);
            if (number && value){
                return true;
            } else {
                return "Must enter a number."
            }
        }
    },
    {
        type: "input",
        name: "salary",
        message: "What is the annual salary for this role? (press return if salary is unknown) ",
        default: 0
    }
]
// let rolesArr = getRoles();
const addEmployeeQuestions = [
    {
        type: "input",
        name: "fName",
        message: "What is the new employee's first name? ",
        validate: value=>{
            if (value && value.split(" ").length === 1){
                return true;
            } else {
                return "Must have a first name, and only one name."
            }
        }
    }, 
    {
        type: "input",
        name: "lName",
        message: "What is the new employee's last name? ",
        validate: value=>{
            if (value && value.split(" ").length === 1){
                return true;
            } else {
                return "Must have a last name, and only one name."
            }
        }
    }, 
    {
        type: "input",
        name: "role",
        message: "What is their title or 'role'? (use role_id) ",
        validate: value=>{
            const number = !isNaN(value);
            if (number && value){
                return true;
            } else {
                return "Must enter a number."
            }
        }
    },
    {
        type: "input",
        name: "isManager",
        message: "If this employee a manager leave blank. Otherwise write their manager's ID number. "
    }
]

const updateEmployeeRoleQuestions = [
    {
        type: "input",
        name: "empId",
        message: "Enter the employee ID for the employee you'd like to update. ",
        validate: value=>{
            const number = !isNaN(value);
            if (number && value){
                return true;
            } else {
                return "Must enter a number."
            }
        }
    },
    {
        type: "input",
        name: "newRole",
        message: "What will this employee's new role be? ",
        validate: value=>{
            const number = !isNaN(value);
            if (number && value){
                return true;
            } else {
                return "Must enter a number."
            }
        }
}
];

// async function getRoles(){
//     const [rows] = await db.getRoleChoicesList();
//     const rolesArr = [...rows];
//     return rolesArr;
// }


module.exports = {addDepartmentQuestions, addRoleQuestions, addEmployeeQuestions, updateEmployeeRoleQuestions}
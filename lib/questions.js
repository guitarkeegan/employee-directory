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
        message: "If this employee is a manager, leave blank. Otherwise, write their manager's ID number. "
    }
]

const updateEmployeeRoleQuestions = [
    {
        type: "input",
        name: "empId",
        message: "Enter the employee ID for the employee you'd like to update (use left hand column above). ",
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
        message: "What will this employee's new role be? (use role_id above) ",
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
const deleteDepartmentQuestions = [
    {
        type: "input",
        name: "dept",
        message: "Type the Department ID that you would like to delete. ",
        validate: value=>{
            const number = !isNaN(value);
            if (number && value){
                return true;
            } else {
                return "Must enter a number."
            }
        }
    }
]
const deleteRoleQuestions = [
    {
        type: "input",
        name: "role",
        message: "Type the Role ID that you would like to delete. ",
        validate: value=>{
            const number = !isNaN(value);
            if (number && value){
                return true;
            } else {
                return "Must enter a number."
            }
        }
    }
]
const deleteEmpQuestions = [
    {
        type: "input",
        name: "emp",
        message: "Type the Employee ID that you would like to delete. ",
        validate: value=>{
            const number = !isNaN(value);
            if (number && value){
                return true;
            } else {
                return "Must enter a number."
            }
        }
    }
]
const updateEmployeeManagerQuestions = [
    {
        type: "input",
        name: "empId",
        message: "Type the ID of the employee you would like to update. (Use the numbers in the left column)",
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
        name: "newManager",
        message: "Type the ID of their new manager. (All managers show 'null' under manager. Be sure to use the number on the left hand side again) ",
        validate: value=>{
            const number = !isNaN(value);
            if (number && value){
                return true;
            } else {
                return "Must enter a number."
            }
        }
    }
]


const empByDeptQuestions = [
    {
        type: "input",
        name: "dept",
        message: "Type the ID of the department you would like to view. ",
        // validate: value=>{
        //     const number = !isNaN(value);
        //     if (number && value){
        //         return true;
        //     } else {
        //         return "Must enter a number."
        //     }
        // }
    }
]

module.exports = {addDepartmentQuestions, addRoleQuestions, addEmployeeQuestions, updateEmployeeRoleQuestions, deleteDepartmentQuestions, updateEmployeeManagerQuestions, deleteEmpQuestions, deleteRoleQuestions, empByDeptQuestions}
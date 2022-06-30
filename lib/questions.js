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
            if (value){
                return true;
            } else {
                return "Must have a first name"
            }
        }
    }, 
    {
        type: "input",
        name: "lName",
        message: "What is the new employee's last name? ",
        validate: value=>{
            if (value){
                return true;
            } else {
                return "Must have a last name"
            }
        }
    }, 
    {
        type: "input",
        name: "role",
        message: "What is their title or 'role'? (use role_id) ",
        validate: value=>{
            if (value){
                return true;
            } else {
                return "Role cannot be left blank. "
            }
        }
    },
    {
        type: "list",
        name: "isManager",
        message: "Is this employee a manager? ",
        choices: ["Yes, they are a manager", "No, they are not a manager"]
    },
    {
        type: "input",
        name: "managerId",
        message: "If the previous answer was no, please write the manager's ID. ",
        default: "Employee is a manager"
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



module.exports = {addDepartmentQuestions, addRoleQuestions, addEmployeeQuestions, updateEmployeeRoleQuestions}
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



module.exports = {addDepartmentQuestions, addRoleQuestions}
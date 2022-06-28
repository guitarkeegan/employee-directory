const addDepartmentQuestions = [
    {
        type: "input",
        name: "deptName",
        message: "What is the new department called? "
    }
]

const addRoleQuestions = [
    {
        type: "input",
        name: "roleName",
        message: "What is the new role called? "
    }, 
    {
        type: "list",
        name: "deptName",
        message: "Which department is the role in? ",
        choices: ["Marketing", "Finance", "Operations Management", "Human Resources", "IT"]
    }
]

module.exports = {addDepartmentQuestions, addRoleQuestions}
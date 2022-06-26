const inquirer = require("inquirer");

inquirer.prompt([
    {
        type: "list",
        message: "What would you like to do?",
        options: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"],
        name: "main",
    }
]).then((response) => {
    if 
})
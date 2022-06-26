const inquirer = require("inquirer");

function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        options: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
        ],
        name: "main",
      },
    ])
    .then((response) => {
      if (response.main === "View all departments") {
      } else if (response.main === "View all roles") {
      } else if (response.main === "View all employees") {
      } else if (response.main === "Add a department") {
        inquirer
          .prompt([
            {
              message: "What is the name of the department?",
              type: "input",
              name: "newDepartment",
            },
          ])
          .then((response) => {});
      } else if (response.main === "Add a role") {
        inquirer.prompt([
          {
            message: "What is the name of the role?",
            type: "input",
            name: "newRole",
          },
          {
            message: "What is the salary of the role?",
            type: "input",
            message: "newRoleSalary",
          },
          {
            message: "Which department does the role belong to?",
            type: "list",
            options: "", // iterate through departments and list
            name: "newRoleDepartment",
          },
        ]);
      } else if (response.main === "Add an employee") {
        inquirer.prompt([
          {
            message: "What is the employee's first name?",
            type: "input",
            name: "newEmployeeFirstName",
          },
          {
            message: "What is the employee's last name?",
            type: "input",
            name: "newEmployeeLastName",
          },
          {
            message: "What is the employee's role?",
            type: "list",
            options: "", // iterate through roles and list
            name: "newEmployeeRole",
          },
          {
            message: "Who is the employee's manager?",
            type: "list",
            options: "", // iterate through managers and list
          },
        ]);
      } else if (response.main === "Update an employee role") {
        inquirer.prompt([
          {
            message: "Which employee's role do you want to update?",
            type: "list",
            options: "", // iterate through employees and list
            name: "updateEmployee",
          },
          {
            message:
              "Which role do you want to assign to the selected employee?",
            type: "list",
            options: "", // iterate through roles and list
            name: "updateRole",
          },
        ]);
      }
    });
  mainMenu();
}

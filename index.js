const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Bootc@mp01!",
    database: "company_db",
  },
  console.log(`Connected to the company_db database.`)
);

function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: [
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
        const sql = `SELECT * FROM departments`;
        db.query(sql, function (err, data) {
          console.table(data);
        });
        mainMenu();
      } else if (response.main === "View all roles") {
        const sql = `SELECT * FROM roles`;
        db.query(sql, function (err, data) {
          console.table(data);
        });
        mainMenu();
      } else if (response.main === "View all employees") {
        const sql = `SELECT * FROM employees`;
        db.query(sql, function (err, data) {
          console.table(data);
        });
        mainMenu();
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
        inquirer
          .prompt([
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
              choices: "", // iterate through departments and list
              name: "newRoleDepartment",
            },
          ])
          .then((response) => {});
      } else if (response.main === "Add an employee") {
        inquirer
          .prompt([
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
              choices: "", // iterate through roles and list
              name: "newEmployeeRole",
            },
            {
              message: "Who is the employee's manager?",
              type: "list",
              choices: "", // iterate through managers and list
            },
          ])
          .then((response) => {});
      } else if (response.main === "Update an employee role") {
        inquirer
          .prompt([
            {
              message: "Which employee's role do you want to update?",
              type: "list",
              choices: "", // iterate through employees and list
              name: "updateEmployee",
            },
            {
              message:
                "Which role do you want to assign to the selected employee?",
              type: "list",
              choices: "", // iterate through roles and list
              name: "updateRole",
            },
          ])
          .then((response) => {});
      }
    });
}

mainMenu();

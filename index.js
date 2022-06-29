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

let departmentList;

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
          "Quit",
        ],
        name: "main",
      },
    ])
    .then((response) => {
      if (response.main === "View all departments") {
        const sql = `SELECT * FROM departments`;
        db.promise()
          .query(sql)
          .then(([rows, fields]) => {
            console.table(rows);
          })
          .catch(console.log)
          .then(() => mainMenu());
      } else if (response.main === "View all roles") {
        const sql = `SELECT roles.id, roles.title, roles.salary, departments.department_name AS department FROM roles LEFT JOIN departments ON roles.department_id = departments.id`;
        db.promise()
          .query(sql)
          .then(([rows, fields]) => {
            console.table(rows);
          })
          .catch(console.log)
          .then(() => mainMenu());
      } else if (response.main === "View all employees") {
        const sql = `SELECT CONCAT(e.first_name, ' ', e.last_name) AS 'Employee Name', title, departments.department_name AS department, salary, CONCAT(m.first_name, ' ', m.last_name) AS Manager FROM (((employees e INNER JOIN roles ON role_id = roles.id) INNER JOIN departments ON department_id = departments.id) LEFT JOIN employees m ON 
        m.id = e.manager_id)`;
        db.promise()
          .query(sql)
          .then(([rows, fields]) => {
            console.table(rows);
          })
          .catch(console.log)
          .then(() => mainMenu());
      } else if (response.main === "Add a department") {
        inquirer
          .prompt([
            {
              message: "What is the name of the department?",
              type: "input",
              name: "newDepartment",
            },
          ])
          .then((response) => {
            const sql = `INSERT INTO departments (department_name) VALUES ("${response.newDepartment}")`;
            db.query(sql);
            mainMenu();
          });
      } else if (response.main === "Add a role") {
        const sql = `SELECT departments.department_name FROM departments`;
        db.promise()
          .query(sql)
          .then((rows) => {
            departmentList = [rows].map(department => `"${department}`).join(",");
          });
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
              name: "newRoleSalary",
            },
            {
              message: "Which department does the role belong to?",
              type: "list",
              choices: departmentList,
              name: "newRoleDepartment",
            },
          ])
          .then((response) => {
            db.query(`INSERT INTO roles (title, salary) VALUES ("${response.newrole}", "${response.newRoleSalary}", ${response.newRoleDepartment.value})`);
            mainMenu();
          });
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
      } else if (response.main === "Quit") {
        process.exit(1);
      }
    });
}

mainMenu();


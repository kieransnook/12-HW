const mysql = require("mysql");
const inquirer = require("inquirer");

// const dotenv = require("dotenv").config();

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);

  initialPrompt ()
});


function initialPrompt() {
  inquirer.prompt([
    {
      type: "list",
      message: "WELCOME! What would you like to do?",
      name: "employeeAction",
      choices: [
        "View all Employees",
       "View all Employees by Department",
        "View all Employees by Manager",
         "View all Departments",
          "View all Roles",
           "Add Department",
            "Add Employee",
             "Add Role",
              "Update Employee Role",
               "Update Employee Managers",
                   "Quit"]
    }
  ]).then(function (answer) {
    switch (answer.action) {
      case "View all Employees":
        viewAllEmployees();
        break;

      case"View all Employees by Department":
        viewAllEmployeesByDepartment();
        break;

      case "View all Employees by Manager":
        viewAllEmployeesByManager();
        break;
  
      case"View all Departments":
        viewAllDepartments();
        break; 

      case "View all Roles":
        viewAllRoles();
        break;
    
      case"Add Department":
        addDepartment();
        break;

      case "Add Employee":
        addEmployee();
        break;
      
      case"Add Role":
        addRole();
        break;   

      case "Update Employee Role":
        updateEmployeeRole();
        break;
        
      case"Update Employee Managers":
        updateEmployeeManagers();
        break;
      
      case "Quit":
        quit();
        break;

    }
  }
  )}
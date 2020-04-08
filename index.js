const mysql = require("mysql");

const inquirer = require("inquirer");
require("dotenv").config();

let deptArray = [];
let deptIDArray = [];
let roleArray = [];
let employeeArray = [];

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "employeemanagement_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  startApp();
});

function startApp() {
  inquirer
    .prompt([
      {
        name: "select",
        type: "list",
        message: "Welcome! Please select a task.",
        choices: [
          "Add department",
          "View all departments",
          "Add role",
          "View all roles",
          "Update Employee Role",
          "Add Employee",
          "View all employees",
          "View all employees by department",
          "View all employees by role",

          "EXIT",
        ],
      },
    ])
    .then(function (res) {
      // console.log("Loading....");

      switch (res.select) {
        case "Add department": //DONE
          addDept();
          break;
        case "View all departments":
          viewDepts(); //prints dept table//DONE
          break;
        case "Add role": //DONE
          addRole();
          break;
        case "View all roles":
          viewRoles(); //prints roles table//DONE
          break;
        case "Add Employee": //DONE
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole(); //done
          break;
        case "View all employees":
          allEmployees(); //
          break;
        case "View all employees by department":
          viewEmployeesByDept(); //
          break;
        case "View all employees by role":
          viewEmployeesByRole(); //
          break;
        case "View all employees by manager":
          viewEmployeesByMgr(); //
          break;
        case "EXIT":
          console.log("Oh Yeah! Take a break! Goodbye!");
          connection.end();
      }
    });
}

//Manager Id Function
function getMgrID() {
  let query = `SELECT mgr_id FROM employee WHERE firstName = ${firstName} AND lastName = ${lastName};`;
  connection.query(query, function (err, res) {
    if (err) throw err;
    // console.log(`${res[0].id}`);
    let mgr_id = res[0].id;
  });
}

//Array Functions
//pushes to new dept to dept array to be used in choices menu for new role/new employee/view employee by dept-WORKS!!!
function deptPush() {
  connection.query(
    "SELECT dept FROM employeemanagement_db.dept",
    function (err, res) {
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        deptArray.push(res[i].dept);
      }
      //console.log(deptArray);//this is correct don't delete
    }
  );
}
//pushes deptId to deptID array to be used in choices menu for new role/new employee-WORKS!!!
function deptIDPush() {
  connection.query(
    "SELECT id FROM employeemanagement_db.dept",
    function (err, res) {
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        deptIDArray.push(res[i].id);
      }
      //console.log(deptArray);//this is correct don't delete
    }
  );
}

//pushes role to role array to be used in choices menu for new employee/view employees/dpt by role-WORKS!!!
function rolePush() {
  connection.query(
    "SELECT role FROM employeemanagement_db.role",
    function (err, res) {
      if (err) throw err;

      for (let i = 0; i < res.length; i++) {
        roleArray.push(res[i].role);
      }
      // console.log(roleArray);//this is correct
      // console.log(deptIDArray);
    }
  );
}
//pushes full name to employee Array to be used for manager selection, update employee
function employeePush() {
  let query =
    "SELECT firstName, lastName FROM employeemanagement_db.employee;";
  connection.query(query, function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      // console.log(res);
      // console.log(res[1].firstName);
      employeeArray.push(res[i].firstName + " " + res[i].lastName); ///check on this
    }
    // console.log(employeeArray);
  });
}

// employeePush();

//ADD FUNCTIONS
//ADD DEPT-WORKS!!!!!!
function addDept() {
  inquirer
    .prompt({
      name: "deptName",
      type: "input",
      message: "What is the department name you want to add ? ",
      validate: function (value) {
        var string = value.match(/^\s*\S+.*/);
        if (string) {
          return true;
        } else {
          return "Please enter the new department's name";
        }
      },
    })
    .then(function (data) {
      let query = `INSERT INTO dept (dept) VALUES('${data.deptName}');`;
      connection.query(query, function (err, res) {
        if (err) throw err;
        console.log(
          `${data.deptName} has been added to employee management system!`
        );
        deptPush();
        startApp();
      });
    });
}
//ADD ROLE-WORKS!!!!!!
function addRole() {
  deptPush();
  deptIDPush();
  inquirer
    .prompt([
      {
        name: "role",
        type: "input",
        message: "What is the title of the role you want to add?",
      },
      {
        name: "roleID",
        type: "input",
        message:
          "What is the ID number you would like to assign to this role? ",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary for the new role? ",
      },
      {
        name: "dept",
        type: "list",
        message: "What is the assigned department for the new role? ",
        choices: deptArray,
      },
      {
        name: "deptID",
        type: "list",
        message: "What is the department ID for the role? ",
        choices: deptIDArray,
      },
    ])
    .then(function (data) {
      let query = `INSERT INTO employeemanagement_db.role (id, role, salary, dept_id) VALUES (${data.roleID}, "${data.role}", ${data.salary}, ${data.deptID});`;
      connection.query(query, function (err, res) {
        if (err) throw err;
        console.log(
          `${data.role} has been added to employee management system!`
        );
        rolePush();
        startApp();
      });
    });
}

//addEmployee-WORKS!!
function addEmployee() {
  rolePush();
  employeePush();
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the first name of the new employee?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the last name of the new employee?",
      },
      {
        name: "roleID",
        type: "input",
        message: "What is the role ID of the new employee?",
      },
      {
        name: "mgrID",
        type: "input",
        message: "What is the manager id for this employee?",
      },
    ])
    .then(function (data, err) {
      if (err) throw err;
      console.log(`Line 252 ${data.mgrID}`);
      let query = `INSERT INTO employeemanagement_db.employee (firstName, lastName, role_id, mgr_id) VALUES ("${data.firstName}", "${data.lastName}", ${data.roleID}, ${data.mgrID});`;
      connection.query(query, function (err, res) {
        if (err) throw err;
        console.log(
          `"${data.firstName}" has been added to employee management system!`
        );
        startApp();
      });
    });
}

function viewEmployees() {
  let query = "SELECT * FROM employee";
  connection.query(query, function (res, err) {
    if (err) {
      throw err;
    }
    console.table(res);
  });
}
//UPDATE EMPLOYEE ROLE-WORKS!
function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        name: "currentRoleId",
        type: "input",
        message:
          "Please enter ID of employee you would like to update:",
      },
      {
        name: "newRoleID",
        type: "input",
        message: "Please enter new role ID you would like to assign.",
      },
    ])
    .then(function (data) {
      let query = `UPDATE employee SET role_id = ${data.newRoleID} WHERE id = ${data.currentRoleId};`;
      connection.query(query, function (err) {
        if (err) {
          throw err;
        }
        console.log("Employee role has been updated!");
        startApp();
      });
    });
}

// //VIEW FUNCTIONS
// //VIEW ALL DEPT
function viewDepts() {
  let query = "SELECT * FROM dept;";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}

//View employees by role
function viewEmployeesByRole() {
  inquirer
    .prompt([
      {
        name: "role",
        type: "input",
        message: "What is the role you would like to search by",
      },
    ])
    .then(function (data, err) {
      if (err) throw err;
      let query = `SELECT employee.id, employee.firstName, employee.lastName, role.role, role.salary, dept.dept FROM dept INNER JOIN role ON role.dept_id = dept.id INNER JOIN employee ON role.id = employee.role_id WHERE role.role = "${data.role}";`;
      connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
      });
    });
}
//View employees by dept
function viewEmployeesByDept() {
  inquirer
    .prompt([
      {
        name: "dept",
        type: "input",
        message: "What is the department you would like to search by",
      },
    ])
    .then(function (data, err) {
      if (err) throw err;
      let query = `SELECT employee.id, employee.firstName, employee.lastName, role.role, role.salary, dept.dept FROM dept INNER JOIN role ON role.dept_id = dept.id INNER JOIN employee ON role.id = employee.role_id WHERE dept.dept = "${data.dept}";`;
      connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
      });
    });
}

// //View All roles function
function viewRoles() {
  deptPush();
  rolePush();
  let query = "SELECT * FROM role;";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}

// //View All Employees function
function allEmployees() {
  deptPush();
  rolePush();
  console.log(employeeArray);
  let query =
    "SELECT employee.id, firstName, lastName, role, dept_id, salary, mgr_id FROM role INNER JOIN employee ON role.id = employee.role_id ORDER BY employee.id;";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}

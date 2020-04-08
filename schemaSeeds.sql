DROP DATABASE IF EXISTS company_db;

DROP DATABASE IF EXISTS employeemanagement_db;
CREATE DATABASE employeemanagement_db;

USE employeemanagement_db;

CREATE TABLE dept(
    id INT AUTO_INCREMENT NOT NULL,
    dept VARCHAR(30) DEFAULT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role(
    id INT AUTO_INCREMENT NOT NULL,
    role VARCHAR(30) DEFAULT NULL,
    salary DECIMAL DEFAULT NULL,
    dept_id INT DEFAULT 0,
    PRIMARY KEY(id),
    FOREIGN KEY (dept_id) REFERENCES dept(id)
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    role_id INT,
    mgr_id INT DEFAULT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (mgr_id) REFERENCES employee(id)
);

INSERT INTO dept(dept)
VALUES("Sales");
INSERT INTO dept(dept)
VALUES("Engineering");
INSERT INTO dept(dept)
VALUES("Finance");
INSERT INTO dept(dept)
VALUES("Legal");

INSERT INTO role(role, salary, dept_id)
VALUES("Kingslayer", 100000, 1);
INSERT INTO role(role, salary, dept_id)
VALUES("Salesperson", 80000, 1);
INSERT INTO role(role, salary, dept_id)
VALUES("Faceless men", 150000, 2);
INSERT INTO role(role, salary, dept_id)
VALUES("The Rightful King", 120000, 2);
INSERT INTO role(role, salary, dept_id)
VALUES("Accountant", 125000, 3);
INSERT INTO role(role, salary, dept_id)
VALUES("Fighter", 250000, 4);
INSERT INTO role(role, salary, dept_id)
VALUES("Lawyer", 190000, 4);

INSERT INTO employee(firstName, lastName, role_id)
VALUES("John", "Snow", 4),("Arya", "Snow", 3), ("Oberyn", "Martell", 6),("Jamie", "Lannister", 1),("Hodor", "hodor", 7);

UPDATE employee
SET mgr_id = 2
WHERE id = 1;

UPDATE employee
SET mgr_id = 3
WHERE id = 5;

--joins dept to role then role to employee!
SELECT employee.id, employee.firstName, employee.lastName, role.role, role.salary, dept.dept FROM dept INNER JOIN role ON dept.id = role.dept_id INNER JOIN employee on role.id = employee.role_id;

SELECT SUM (salary) FROM employees
DROP DATABASE IF EXISTS company_db;

/* Create database */
CREATE DATABASE company_db;
USE compandy_db;

/* employee table */
CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  firstName VARCHAR(20) NOT NULL,
  lastName VARCHAR(20) NOT NULL,
  PRIMARY KEY (id)
);
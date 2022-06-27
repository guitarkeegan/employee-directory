DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
USE employees_db;
CREATE TABLE department (
    id INT NOT NULL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT PRIMARY KEY,
    title VARCHAR(60) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL, 
    FOREIGN KEY(department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY(role_id)
    REFERENCES role(id)
    ON DELETE SET NULL,
    manager_id INT NOT NULL,
    FOREIGN KEY(manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);
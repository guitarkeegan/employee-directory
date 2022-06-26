INSERT INTO department (id, name)
VALUES (1, "Accounting");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Manager", 42000.89, 1);

INSERT INTO employee (id, first_name, last_name, roll_id, manager_id)
VALUES (1, "John", "Mayer", 1, 2);
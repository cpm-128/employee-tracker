INSERT INTO departments (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal')
;

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Sales Lead', 50000, 1),
    ('Sales Representative', 25000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Accountant', 125000, 3),
    ('Accounts Payable', 65000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4)
;

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Mike', 'Chan', 2, 5),
    ('Ashley', 'Rodriguez', 3, 7),
    ('Kevin', 'Tupik', 4, NULL),
    ('Kunal', 'Singh', 1, 5),
    ('Malia', 'Brown', 5, 1),
    ('Sarah', 'Lord', 6, 3),
    ('Tom', 'Allen', 7, 3)
;
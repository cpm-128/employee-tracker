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
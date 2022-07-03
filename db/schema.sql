DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;

CREATE TABLE departments (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- roles table, department_id as FK
CREATE TABLE roles (
    title VARCHAR(30) NOT NULL,
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_id INTEGER,
    salary DECIMAL(10,2) NOT NULL
    CONSTRAINT fk_department
        FOREIGN KEY (department_id)
        REFERENCES departments(id)
        -- must reference the primary key
        ON DELETE RESTRICT
        -- does not allow you to delete the fk in it's primary table
);

-- employees table, role_id as FK
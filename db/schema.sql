DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;

CREATE TABLE departments (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- roles table, department_id as FK
CREATE TABLE roles (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INTEGER
    CONSTRAINT fk_party
        FOREIGN KEY (department_id)
        REFERENCES departments(id)
        -- must reference the primary key
        ON DELETE RESTRICT
        -- does not allow you to delete the fk in it's primary table
);

-- employees table, role_id as FK
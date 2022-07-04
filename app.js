// packages
const inquirer = require('inquirer');
const inputCheck = require('./utils/inputCheck');
const db = require('./db/connection');

// =============================
// CONNECT TO DATABASE
// RUN THE MAIN MENU ON APP LOAD
// =============================
db.connect(function(err) {
    if (err) throw err;

    console.clear();
    console.log('=================================')
    console.log('Welcome to the Employee Database.')
    console.log('=================================')

    mainMenu();
})

// MAIN MENU
function mainMenu() {
    return new Promise((resolve, rej) => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'Quit'
                ]
            }
        ]).then(function(answers) {
            switch (answers.action) {

                // VIEW ALL DEPARTMENTS
                case "View all departments":
                    console.log(">>> You chose to view all departments <<<");
                    viewAllDepartments();
                break;

                // VIEW ALL ROLES
                case "View all roles":
                    console.log(">>> You chose to view all roles <<<");
                    viewAllRoles();
                break;

                // VIEW ALL EMPLOYEES
                case "View all employees":
                    console.log(">>> You chose to view all employees <<<");
                    viewAllEmployees();
                break;

                // ADD A DEPARTMENT
                case "Add a department":
                    console.log(">>> You chose to add a department <<<");
                    addDepartment();
                break;

                // ADD A ROLE
                case "Add a role":
                    console.log(">>> You chose to add a role >>>");
                    addRole();
                break;

                // ADD AN EMPLOYEE
                case "Add an employee":
                    addEmployee();
                break;

                // UPDATE EMPLOYEE ROLE
                case "Update an employee role":
                    updateEmployeeRole();
                break;

                // QUIT
                case "Quit":
                    quit();
                break;
            }
        })
    })
};

// ========================
// FUNCTIONS FROM MAIN MENU
// ========================

function viewAllDepartments() {
    // send the query to the db
    const sql = `SELECT
                    departments.id AS ID,
                    departments.name AS Department
                FROM departments
                `;
    db.query(sql, (err, res) => {
        if (err) {
            console.log('DATABASE ERROR');
            return;
        }
        console.table(res);
        mainMenu();
    });
};

function viewAllRoles() {
    // send the query to the db
    const sql = `SELECT
                    roles.title AS Title,
                    roles.id AS Role_id,
                    departments.name AS Department,
                    roles.salary AS Salary
                FROM roles
                    LEFT JOIN departments
                    ON roles.department_id = departments.id
                `;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log('DATABASE ERROR');
            return;
        };
        console.table(rows);
        mainMenu();
    })
};

function viewAllEmployees() {
    // send the query to the db
    //TODO: display manager name instead of manager_id
    const sql = `SELECT
                    employees.id AS employee_id,
                    employees.first_name AS first_name,
                    employees.last_name AS last_name,
                    roles.title AS title,
                    departments.name AS department,
                    roles.salary AS salary,
                    employees.manager_id AS manager_id
                FROM employees
                    LEFT JOIN roles
                        ON employees.role_id = roles.id
                    LEFT JOIN departments
                        ON roles.department_id = departments.id
                `;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log('DATABASE ERROR');
            return;
        };
        console.table(rows);
        mainMenu();
    })
};

function addDepartment() {
    // prompt for the missing info
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What department would you like to add?"
        }
    ]).then(function(answers) {
        // data validation first
        const errors = inputCheck(answers, 'name');
        if (errors) {
            console.log('Error: must enter a valid department name.')
            return;
        };
        // send the query to the db
        const sql = `INSERT INTO departments (name) VALUES (?)`;
        const params = [answers.name];

        db.query(sql, params, (err, result) => {
            if (err) {
                console.log('DATABASE ERROR');
                return;
            };
            console.log('>>> The department has been added <<<')
            viewAllDepartments();
        });
    });
};

function addRole() {
    // prompt for the missing info
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "What is the role title?"
        },
        {
            name: "department_id",
            type: "number",
            message: "What is the department id for this role?"
        },
        {
            name: "salary",
            type: "number",
            message: "What is the salary for this role?",
        }
    ]).then(function(answers) {
        // data validation first
        const errors = inputCheck(answers, 'title', 'department_id', 'salary');
        if (errors) {
            console.log('Error: must enter a valid title, department id, and salary.')
            return;
        };
        // send the query to the db
        const sql = `INSERT INTO roles (title, department_id, salary)
                        VALUES (?,?,?)
                    `;
        const params = [answers.title, answers.department_id, answers.salary];

        db.query(sql, params, (err, result) => {
            if (err) {
                console.log('DATABASE ERROR');
                return;
            };
            console.log('>>> The role has been added <<<')
            viewAllRoles();
        });
    });
};

function addEmployee() {
    console.log(">>> You choose to add an employee >>>");

    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "What is the employee's first name?"
        },
        {
            name: "last_name",
            type: "input",
            message: "What is the employee's last name?"
        },
        {
            name: "role_id",
            type: "number",
            message: "What is the employee's role id?"
        },
        {
            name: "manager_id",
            type: "number",
            message: "What is the id of the manager the employee will be reporting to?"
        },
    ])
    //TODO: add the function to insert this in the db
};

function updateEmployeeRole() {
    console.log(">>> You choose to update an employee's role >>>");

    inquirer.prompt([
        {
            name: "employee_id",
            type: "number",
            message: "What is the employee id you are assigning a new role to?"
        },
        {
            name: "role_id",
            type: "number",
            message: "What the the new role id?"
        }
    ])
     //TODO: add the function to insert this in the db
};

function quit() {
    console.log(">>> GOODBYE. <<<");
    db.end();
};
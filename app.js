// packages
const inquirer = require('inquirer');
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
                    viewAllDepartments();
                break;

                // VIEW ALL ROLES
                case "View all roles":
                    viewAllRoles();
                break;

                // VIEW ALL EMPLOYEES
                case "View all employees":
                    viewAllEmployees();
                break;

                // ADD A DEPARTMENT
                case "Add a department":
                    addDepartment();
                break;

                // ADD A ROLE
                case "Add a role":
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
    console.log(">>> You chose to view all departments <<<");

    // send the query to the db
    const sql = `SELECT departments.id AS ID, departments.name AS Department FROM departments`;
    db.query(sql, (err, res) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.table(res);
        mainMenu();
    });
};

function viewAllRoles() {
    console.log(">>> You choose to view all roles >>>");
};

function viewAllEmployees() {
    console.log(">>> You choose to view all employees >>>");
};

function addDepartment() {
    console.log(">>> You choose to add a department >>>");

    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What department would you like to add?"
        }
    ])
    //TODO: add the function to insert this in the db
};

function addRole() {
    console.log(">>> You choose to add a role >>>");

    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "What is the role title?"
        },
        {
            name: "salary",
            type: "number",
            message: "What is the salary for this role?",
        },
        {
            name: "department_id",
            type: "number",
            message: "What is the department id for this role?"
        }
    ])
    //TODO: add the function to insert this in the db
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
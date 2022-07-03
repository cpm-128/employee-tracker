// application to run from the command line
const inquirer = require('inquirer');

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
                    {
                        name: 'Quit',
                        value: false
                    }
                ]
            }
        ]).then(function(answers) {
            switch (answers.action) {

                // VIEW ALL DEPARTMENTS
                case "View all departments":
                    viewAllDepartments();
                break;
            }
        })
    })
}

// ======================================
// RUN THE MAIN MENU FUNCTION ON APP LOAD
// ======================================
mainMenu();

// ========================
// FUNCTIONS FROM MAIN MENU
// ========================
function viewAllDepartments() {
    console.log(">>> You choose to view all departments >>>");
};
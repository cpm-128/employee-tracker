const mysql = require('mysql2');

// connect to the MySQL database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: '',
        database: 'employeeTracker'
    },
    console.log('Connected to the employeeTracker database.')
);

module.exports = db;
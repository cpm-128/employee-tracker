const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// GET all employees with first_name, last_name, job title, department, salary, and manager
router.get('/employees', (req, res) => {
    const sql = `SELECT * FROM employees`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// POST an employee
// assume object req.body will be used to populate the role's data
router.post('/employees', ({ body }, res) => {
    // data validatation first
    const errors = inputCheck(body, 'first_name', 'last_name', 'role_id', 'manager_id');
    if (errors) {
        res.status(400).json({ errors: errors });
        return;
    }

    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
    const params = [body.name];

    db.query(sql, params, (err, result) => {
        res.json({
            message: 'success',
            data: body
        });
    });
});

// PUT an employee

module.exports = router;
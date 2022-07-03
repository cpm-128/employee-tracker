const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// GET all roles with job title, role id, department, and salary
router.get('/roles', (req, res) => {
    const sql = `SELECT
                    roles.title AS title,
                    roles.id AS id,
                    departments.name AS department,
                    roles.salary AS salary
                FROM roles
                    LEFT JOIN departments
                    ON roles.department_id = departments.id
                `;
    // `SELECT roles.*, departments.name AS department_id
    //             FROM roles
    //             LEFT JOIN departments
    //             ON roles.department_id = departments.id`

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

// POST a role
// assume object req.body will be used to populate the role's data
router.post('/roles', ({ body }, res) => {
    // data validatation first
    const errors = inputCheck(body, 'title', 'department_id', 'salary');
    if (errors) {
        res.status(400).json({ errors: errors });
        return;
    }

    const sql = `INSERT INTO roles (title, department_id, salary) VALUES (?,?,?)`;
    const params = [body.name];

    db.query(sql, params, (err, result) => {
        res.json({
            message: 'success',
            data: body
        });
    });
});

module.exports = router;
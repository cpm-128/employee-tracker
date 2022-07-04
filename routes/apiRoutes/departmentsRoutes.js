const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// GET all department names and department ids
// router.get('/departments', (req, res) => {
//     const sql = `SELECT * FROM departments`;

//     db.query(sql, (err, rows) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: rows
//         });
//     });
// });

// POST a department
// assume object req.body will be used to populate the candidate's data
// router.post('/departments', ({ body }, res) => {
//     // data validatation first
//     const errors = inputCheck(body, 'name');
//     if (errors) {
//         res.status(400).json({ errors: errors });
//         return;
//     }

//     const sql = `INSERT INTO departments (name) VALUES (?)`;
//     const params = [body.name];

//     db.query(sql, params, (err, result) => {
//         if (err) {
//             res.status(400).json({ error: err.message });
//         }
//         res.json({
//             message: 'success',
//             data: body
//         });
//     });
// });

module.exports = router;
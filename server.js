const express = require('express');
const db = require('./db/connection');
//const apiRoutes = require('./routes/apiRoutes');
const inputCheck = require('./utils/inputCheck');
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// API ROUTES (endpoints)
//app.use('/api', apiRoutes);

// GET all department names and department ids
app.get('/api/departments', (req, res) => {
    const sql = `SELECT * FROM departments`;

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

// POST a department
// assume object req.body will be used to populate the candidate's data
app.post('/api/departments', ({ body }, res) => {
    // data validatation first
    const errors = inputCheck(body, 'name');
    if (errors) {
        res.status(400).json({ errors: errors });
        return;
    }

    const sql = `INSERT INTO departments (name) VALUES (?)`;
    const params = [body.name];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

// TEST CONNECTION
app.get('/', (req, res) => {
    res.json({
        message: 'Hello, World!'
    });
});

// Default response for any requests that are Not Found
app.use((req, res) => {
    res.status(400).end();
})

// listen for port and start server after db connection
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
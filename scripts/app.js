// app.js
const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Register endpoint
app.post('/register', (req, res) => {
    const { userId, firstName, lastName, password } = req.body;

    const sql = 'INSERT INTO users (userId, firstName, lastName, password) VALUES (?, ?, ?, ?)';
    connection.query(sql, [userId, firstName, lastName, password], (err, result) => {
        if (err) {
            console.error('Error registering user:', err);
            res.status(500).send('Error registering user');
            return;
        }
        console.log('User registered successfully');
        res.status(200).send('User registered successfully');
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

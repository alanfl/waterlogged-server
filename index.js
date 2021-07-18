const express = require('express');
require('dotenv').config()
const app = express();

const mysql = require('mysql');
const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

conn.connect((err) => {
    if (err) throw err;
    console.log("Connected to database.");
});

// Define serialization method
app.use(express.json());

// Define parsing method
app.use(express.urlencoded({extended: true}));

// Sample route
app.post('/hello/', (req, resp) => {
    conn.query(
        "SELECT * FROM water_log WHERE pid=?",
        ["1.fei.luo@gmail.com"],
        (err, res, fields) => {
            if (err) throw err;
            console.log(res);
            resp.send(res);
        }
    );
});

app.get('/log', (req, resp) => {
    let date = new Date(req.body.date);

    // Send no data for dates in the future
    if (date > Date.now()) {
        resp.send(null);
        return;
    }

    conn.query(
        "SELECT * FROM water_log WHERE"
    );
});

app.listen(10000, () => {
    console.log("Now listening on port 10000.");
});
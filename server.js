const express = require('express');
const mysql = require('mysql')
const app = express()

// Middleware for parsing JSON
app.use(express.json());

// MySQL database connection 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'temp'
})

// connect and log the state of connection 
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});


app.get('/', (req, res) => {
    res.send("Online diary")
})

app.get("/books", (req, res) => {
    const sql = "SELECT * FROM books"

    db.query(sql, (err, data) => {
        if (err) return res.send(err)
        return res.send(data)
    })
})

// connection listen 
app.listen(8080, () => {
    console.log("Express Running on http://localhost:8080");
})
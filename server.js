const express = require('express');
const mysql = require('mysql')
const app = express()

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'temp'
})

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

app.listen(8080, () => {
    console.log("Express Running on http://localhost:8080");
})
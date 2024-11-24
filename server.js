const express = require('express');
const mysql = require('mysql')
const path = require('path')
const cors = require('cors');
const app = express()

app.use(cors())
// Middleware for parsing JSON
app.use(express.json());

// MySQL database connection 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'online_diary'
})

// connect and log the state of connection 
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Export the db connection
module.exports = db;

// routes
app.use("/", require(path.join(__dirname, "routes/route.js")));

// connection listen 
app.listen(8080, () => {
    console.log("Express Running on http://localhost:8080");
})
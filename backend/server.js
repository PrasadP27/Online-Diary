const express = require('express');
const mysql = require('mysql')
const path = require('path')
const cors = require('cors');
const app = express()
const session = require('express-session');
require('dotenv').config()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(session({
    secret: process.env.SECRET_KEY,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, //one day 24hrs
    resave: true,
    saveUninitialized: false,
    name: "Inkwell.user",
}))

app.use(express.json()); // Middleware for parsing JSON
app.use(express.urlencoded({ extended: true }));

// MySQL database connection 
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
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
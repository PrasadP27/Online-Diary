const express = require('express');
const mysql = require('mysql')
const path = require('path')
const cors = require('cors');
const app = express()
const session = require('express-session');

app.use(session({
    secret: 'secretkey',
    // cookie: { maxAge: 24 * 60 * 60 * 1000 }, //one day 24hrs
    cookie: { maxAge: 30000 }, //30sec
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: false }
}))

app.use(cors())
app.use(express.json()); // Middleware for parsing JSON
app.use(express.urlencoded({ extended: true }));

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

// Middleware to attach user info to the request object
const attachUserToRequest = (req, res, next) => {
    if (req.session && req.session.user) {
        req.user = {
            id: req.session.user.id,
            name: req.session.user.name,
            email: req.session.user.email,
        };
    } else {
        req.user = null;
    }
    next();
};
app.use(attachUserToRequest);

// routes
app.use("/", require(path.join(__dirname, "routes/route.js")));

// connection listen 
app.listen(8080, () => {
    console.log("Express Running on http://localhost:8080");
})
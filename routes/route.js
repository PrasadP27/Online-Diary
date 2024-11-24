const express = require('express');
const db = require("../server")
const router = express.Router()

router.get('/', (req, res) => {
    // res.send("Online diary")

    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    return res.json({ user: req.user });
})

// signup into database 
router.post('/signup', (req, res) => {
    const checkEmailSql = "SELECT * FROM users WHERE `email` = ?";

    // Check if the email already exists
    db.query(checkEmailSql, [req.body.email], (err, data) => {
        if (err) {
            return res.json({ message: "Error occurred", error: err });
        }

        if (data.length > 0) {
            return res.json({ message: "Account already exists" });
        }

        // If the email does not exist, proceed with the signup
        const sql = "INSERT INTO users (`name`, `email`, `password`) VALUES (?)";
        const values = [
            req.body.name,
            req.body.email,
            req.body.password
        ];

        db.query(sql, [values], (err, result) => {
            if (err) {
                return res.json({ message: "Error occurred", error: err });
            }

            // const newUserId = result.insertId;
            // const getUserSql = "SELECT * FROM users WHERE id = ?";
            // db.query(getUserSql, [newUserId], (err, userData) => {
            //     if (err) {
            //         return res.json({ message: "Error occurred while fetching user details", error: err });
            //     }

            //     return res.json({ message: "Signup successful", user: userData[0] });
            // });

            req.session.user = {
                id: result.insertId,
                name: req.body.name,
                email: req.body.email
            };

            return res.json({ message: "Signup successful", user: req.session.user });
        });
    });
});

// login into database 
router.post('/login', (req, res) => {
    const sql = "SELECT * FROM users WHERE `email` = ?";

    // Check for email existence 
    db.query(sql, [req.body.email], (err, data) => {
        if (err) {
            return res.json({ message: "Error occurred", error: err });
        }

        if (data.length === 0) {
            return res.json({ message: "Email not found" });
        }

        // If email exists, then check the password 
        const user = data[0];
        if (user.password !== req.body.password) {
            return res.json({ message: "Wrong password" });
        }

        // If login is successful, return user details
        // const userDetails = {
        //     id: user.id,
        //     name: user.name,
        //     email: user.email
        // };

        // return res.json({ message: "Success login", user: userDetails });

        // Store user info in session
        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        return res.json({ message: "Success login", user: req.session.user });
    });
});

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: "Could not log out" });
        }

        // Clear the session cookie
        res.clearCookie('connect.sid');

        req.user = null;

        return res.status(200).json({ message: "Logged out successfully" });
    });
});

router.get('/profile', (req, res) => {
    // Check if the user is logged in
    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    return res.json({ user: req.user });
});

module.exports = router

const express = require('express');
const db = require("../server")
const router = express.Router()

router.get('/', (req, res) => {
    res.send("Online diary")
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

        db.query(sql, [values], (err, data) => {
            if (err) {
                return res.json({ message: "Error occurred", error: err });
            }
            return res.json({ message: "Signup successful", data: data });
        });
    });
});

// login into database 
router.post('/login', (req, res) => {
    const sql = "SELECT * FROM users WHERE `email` = ?";

    //check for email exits 
    db.query(sql, [req.body.email], (err, data) => {
        if (err) {
            return res.json({ message: "Error occurred", error: err });
        }

        if (data.length === 0) {
            return res.json({ message: "Email not found" });
        }

        // if email exists then check password 
        const user = data[0];
        if (user.password !== req.body.password) {
            return res.json({ message: "Wrong password" });
        }

        return res.json({ message: "Success login" });
    });
});


module.exports = router

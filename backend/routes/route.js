const express = require('express');
const db = require("../server");
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {

    if (!req.session.user) {
        return res.json({ message: "Unauthorized" });
    }
    return res.status(200).json({ user: req.session.user });
});

// Register a new user
router.post('/register', async (req, res) => {
    const checkEmailSql = "SELECT * FROM users WHERE `email` = ?";

    // Check if the email already exists
    db.query(checkEmailSql, [req.body.email], async (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Server error. Please try again soon.", error: err });
        }

        if (data.length > 0) {
            return res.status(409).json({ message: "Account already exists" });
        }

        // If the email does not exist, proceed with the signup
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash the password
        const sql = "INSERT INTO users (`name`, `email`, `password`) VALUES (?)";
        const values = [
            req.body.name,
            req.body.email,
            hashedPassword // Store the hashed password
        ];

        db.query(sql, [values], (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Server error. Please try again later.", error: err });
            }

            req.session.user = {
                id: result.insertId,
                name: req.body.name,
                email: req.body.email
            };

            return res.status(201).json({ message: "Signup successful", user: req.session.user });
        });
    });
});

// Login into database 
router.post('/login', (req, res) => {
    const sql = "SELECT * FROM users WHERE `email` = ?";

    // Check for email existence 
    db.query(sql, [req.body.email], async (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Server error. Please try again soon.", error: err });
        }

        if (data.length === 0) {
            return res.status(404).json({ message: "Email does not exist." });
        }

        // If email exists, then check the password 
        const user = data[0];
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password); // Compare hashed password

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Password is incorrect." });
        }

        // Store user info in session
        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
        };

        return res.status(200).json({ message: "Login successful", user: req.session.user });
    });
});

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: "Server error. Could not log out" });
        }

        // Clear the session cookie
        res.clearCookie('Inkwell.user');

        return res.status(200).json({ message: "Logged out successfully" });
    });
});

// diary 
router.get('/diary', (req, res) => {
    // console.log(req.session.user);

    if (!req.session.user) {
        return res.status(401).json({ message: "No user Found" });
    }

    // Fetch all diaries for the logged-in user
    const fetchDiariesSql = "SELECT * FROM diaries WHERE userId = ? ORDER BY date DESC";
    db.query(fetchDiariesSql, [req.session.user.id], (err, diaries) => {
        if (err) {
            return res.status(500).json({ message: "Server error. Please try again later.", error: err });
        }

        if (!diaries || diaries.length === 0) {
            return res.status(404).json({ message: "No diaries avaliable." });
        }

        return res.status(200).json({ diary: diaries, user: req.session.user });
    });
});

// Function to get the current date and time in IST
function getCurrentISTDate() {
    const now = new Date();
    now.setHours(now.getHours() + 5);
    now.setMinutes(now.getMinutes() + 30);

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// create new entry route
router.post('/diary/:diaryid', (req, res) => {
    // Check if the user is logged in
    if (!req.session.user) {
        return res.status(401).json({ message: "No user Found" });
    }

    const diaryId = req.params.diaryid;

    // First, check if the diary already exists
    const fetchSql = "SELECT * FROM diaries WHERE diaryId = ? AND userId = ?";
    db.query(fetchSql, [diaryId, req.session.user.id], (err, diaryResult) => {
        if (err) {
            return res.status(500).json({ message: "Server error." });
        }

        if (diaryResult.length > 0) {
            return res.status(200).json(diaryResult[0]);
        } else {
            // Diary does not exist, create a new one
            // it gives error that duplicate diary entry hence used ignore 
            const insertSql = "INSERT IGNORE INTO diaries (`diaryId`, `userId`, `date`) VALUES (?, ?, ?)";
            const values = [diaryId, req.session.user.id, getCurrentISTDate()];

            db.query(insertSql, values, (err) => {
                if (err) {
                    return res.status(500).json({ message: "Error occured. try after sometime.", error: err });
                }

                // Fetch the newly created diary
                db.query(fetchSql, [diaryId, req.session.user.id], (err, newDiaryResult) => {
                    if (err) {
                        return res.status(500).json({ message: "Error fetching." });
                    }

                    return res.status(201).json(newDiaryResult[0]);
                });
            });
        }
    });
});

router.put('/diary/:diaryid', (req, res) => {

    if (!req.session.user) {
        return res.status(401).json({ message: "No user Found" });
    }

    const diaryId = req.params.diaryid;
    const { content, heading, tags } = req.body;

    const updateSql = "UPDATE diaries SET content = ?, heading = ?, tags = ? WHERE diaryId = ? AND userId = ?";
    const values = [content, heading, tags, diaryId, req.session.user.id];

    db.query(updateSql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Server error.", error: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Diary not found or does not belong to the user" });
        }

        // Fetch the updated diary entry
        const fetchSql = "SELECT * FROM diaries WHERE diaryId = ? AND userId = ?";
        db.query(fetchSql, [diaryId, req.session.user.id], (err, diaryResult) => {
            if (err) {
                return res.status(500).json({ message: "Server error while fetching updated diary" });
            }

            if (diaryResult.length === 0) {
                return res.status(404).json({ message: "Diary not found or does not belong to the user" });
            }

            // Return the updated diary entry
            return res.status(200).json({ message: "Diary updated successfully", diary: diaryResult[0] });
        });
    });
});

// Delete a diary entry
router.delete('/diary/:diaryid', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "No user found." });
    }

    const diaryId = req.params.diaryid;

    const deleteSql = "DELETE FROM diaries WHERE diaryId = ? AND userId = ?";
    const values = [diaryId, req.session.user.id];

    db.query(deleteSql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Server Error. Try after sometime.", error: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Diary not found or does not belong to the user" });
        }

        return res.status(200).json({ message: "Diary deleted successfully" });
    });
});

module.exports = router;
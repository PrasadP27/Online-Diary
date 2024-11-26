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

router.get('/diary', (req, res) => {
    // Check if the user is logged in
    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // Fetch all diaries for the logged-in user
    const fetchDiariesSql = "SELECT * FROM diaries WHERE userId = ?";
    db.query(fetchDiariesSql, [req.user.id], (err, diaries) => {
        if (err) {
            return res.status(500).json({ message: err });
        }

        if (diaries.length === 0) {
            return res.json({ message: "No diaries found." })
        }

        return res.json(diaries);
    });
});

// generate diaryid randomly in frontend
// if duplicate id then generate new id 
router.post('/diary/:diaryid', (req, res) => {
    // Check if the user is logged in
    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const diaryId = req.params.diaryid;

    // First, check if the diary already exists
    const fetchSql = "SELECT * FROM diaries WHERE diaryId = ? AND userId = ?";
    db.query(fetchSql, [diaryId, req.user.id], (err, diaryResult) => {
        if (err) {
            return res.status(500).json({ message: err });
        }

        if (diaryResult.length > 0) {
            return res.json(diaryResult[0]);
        } else {
            // Diary does not exist, create a new one
            const insertSql = "INSERT INTO diaries (`diaryId`, `userId`, `date`) VALUES (?, ?, NOW())";
            const values = [diaryId, req.user.id];

            db.query(insertSql, values, (err) => {
                if (err) {
                    return res.status(500).json({ message: err });
                }

                // Fetch the newly created diary
                db.query(fetchSql, [diaryId, req.user.id], (err, newDiaryResult) => {
                    if (err) {
                        return res.status(500).json({ message: err });
                    }

                    return res.json(newDiaryResult[0]);
                });
            });
        }
    });
});

router.put('/diary/:diaryid', (req, res) => {

    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const diaryId = req.params.diaryid;
    const { content, heading } = req.body;

    const updateSql = "UPDATE diaries SET date = NOW(), content = ?, heading = ? WHERE diaryId = ? AND userId = ?";
    const values = [content, heading, diaryId, req.user.id];

    db.query(updateSql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error occurred while updating diary", error: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Diary not found or does not belong to the user" });
        }

        // Fetch the updated diary entry
        const fetchSql = "SELECT * FROM diaries WHERE diaryId = ? AND userId = ?";
        db.query(fetchSql, [diaryId, req.user.id], (err, diaryResult) => {
            if (err) {
                return res.status(500).json({ message: "Error occurred while fetching updated diary", error: err });
            }

            if (diaryResult.length === 0) {
                return res.status(404).json({ message: "Diary not found or does not belong to the user" });
            }

            // Return the updated diary entry
            return res.json({ message: "Diary updated successfully", diary: diaryResult[0] });
        });
    });
})

// Delete a diary entry
router.delete('/diary/:diaryid', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const diaryId = req.params.diaryid;

    const deleteSql = "DELETE FROM diaries WHERE diaryId = ? AND userId = ?";
    const values = [diaryId, req.user.id];

    db.query(deleteSql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error occurred while deleting diary", error: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Diary not found or does not belong to the user" });
        }

        return res.json({ message: "Diary deleted successfully" });
    });
});

module.exports = router

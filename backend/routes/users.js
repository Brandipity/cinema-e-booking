const express = require('express');
const router = express.Router();
const db = require('../db/database');
const bcrypt = require('bcrypt');
// Import email sending function
const sendConfirmationEmail = require('../src/emailSender');


// add a new user
router.post('/', async (request, response) => {
    const { username, email, password } = request.body;

    if (!username || !email || !password) {
        return response.status(400).json({ error: 'Missing required fields: username, email, and password are required' });
    }

    // hashes the password before storing it in the database (encryption ftw)
    const passwordHash = await bcrypt.hash(password, 10);

    const sql = `INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)`;

    db.run(sql, [username, email, passwordHash], async function(err) {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }

        // Send confirmation email
        try {
            await sendConfirmationEmail(email);
        } catch (error) {
            console.error('Error sending confirmation email:', error);
        }

        response.json({ message: 'User added successfully', userId: this.lastID });
    });
});


// get user details by userId
router.get('/:userId', (request, response) => {
    const { userId } = request.params;

    const sql = `SELECT user_id, username, email, created_at FROM users WHERE user_id = ?`;

    db.get(sql, [userId], (err, user) => {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        if (user) {
            response.json(user);
        } else {
            response.status(404).json({ message: "User not found." });
        }
    });
});

// update user information
router.put('/:userId', async (request, response) => {
    const { userId } = request.params;
    const { username, email, password } = request.body;

    let passwordHash = null;
    if (password) {
        passwordHash = await bcrypt.hash(password, 10);
    }

    // skips password update if not provided
    const sql = `UPDATE users SET 
                 username = COALESCE(?, username), 
                 email = COALESCE(?, email), 
                 password_hash = COALESCE(?, password_hash) 
                 WHERE user_id = ?`;

    db.run(sql, [username, email, passwordHash, userId], function(err) {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        response.json({ message: 'User updated successfully', changes: this.changes });
    });
});

// Endpoint to delete a user
router.delete('/:userId', (request, response) => {
    const { userId } = request.params;

    const sql = 'DELETE FROM users WHERE user_id = ?';

    db.run(sql, [userId], function(err) {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        response.json({ message: 'User deleted successfully', changes: this.changes });
    });
});

module.exports = router;

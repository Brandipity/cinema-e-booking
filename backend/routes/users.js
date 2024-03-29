const express = require('express');
const router = express.Router();
const db = require('../db/database');
const bcrypt = require('bcrypt');

// add a new user
router.post('/', async (request, response) => {
    const { username, password, email, firstName, lastName, phoneNumber, cardNumber, expiryDate, cardholderName, securityCode } = request.body;

    // validate data
    if (!username || !password || !email) {
        return response.status(400).json({ error: 'Missing required fields: username, password, and email are required' });
    }

    try {
        const passwordHash = await bcrypt.hash(password, 10);
        db.run(`INSERT INTO users (username, email, password_hash, firstName, lastName, phoneNumber) VALUES (?, ?, ?, ?, ?, ?)`,
            [username, email, passwordHash, firstName, lastName, phoneNumber],
            function(err) {
                if (err) {
                    console.error(err.message);
                    response.status(500).json({ error: err.message });
                    return;
                }

                const userId = this.lastID;

                if (cardNumber && expiryDate && cardholderName && securityCode) {
                    db.run(`INSERT INTO payment_cards (user_id, card_number, expiry_date, cardholder_name, security_code) VALUES (?, ?, ?, ?, ?)`,
                        [userId, cardNumber, expiryDate, cardholderName, securityCode], function(err) {
                            if (err) {
                                console.error(err.message);
                            }
                        });
                }
                response.json({ message: 'User added successfully', userId: userId });
            });
    } catch (error) {
        console.error('Error creating user:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
});


// User login
router.post('/adminLogin', (request, response) => {
    const { username, password } = request.body;

    // validate data
    if (!username || !password) {
        return response.status(400).json({ error: 'Missing required fields: username and password are required' });
    }

    const sql = `SELECT admin_id, username, password_hash FROM admins WHERE username = ?`;

    db.get(sql, [username], async (err, admin) => {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }

        if (!admin) {
            return response.status(401).json({ error: 'Invalid username or password' });
        }

        try {
            const passwordMatch = await bcrypt.compare(password, admin.password_hash);

            if (!passwordMatch) {
                return response.status(401).json({ error: 'Invalid username or password' });
            }

            response.json({ message: 'Admin login successful', adminId: admin.admin_id });
        } catch (error) {
            console.error('Error during admin login:', error);
            response.status(500).json({ error: 'Internal server error' });
        }
    });
});


// get user details by userId
router.get('/:userId', (request, response) => {
    const { userId } = request.params;

    const sql = `SELECT user_id, username, email, password_hash, firstName, lastName, phoneNumber, created_at FROM users WHERE user_id = ?`;

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
    const { username, email, password, firstName, lastName, phoneNumber } = request.body;

    let passwordHash = null;
    if (password) {
        passwordHash = await bcrypt.hash(password, 10);
    }

    const sql = `UPDATE users SET 
                 username = COALESCE(?, username),
                 email = COALESCE(?, email),
                 password_hash = COALESCE(?, password_hash),
                 firstName = COALESCE(?, firstName),
                 lastName = COALESCE(?, lastName),
                 phoneNumber = COALESCE(?, phoneNumber)
                 WHERE user_id = ?`;

    db.run(sql, [username, email, passwordHash, firstName, lastName, phoneNumber, userId], function(err) {
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

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


// user login

router.post('/login', (request, response) => {
    const { username, password } = request.body;
    // validate data
    if (!username || !password) {
        return response.status(400).json({ error: 'Missing required fields: username and password are required' });
    }
    const sql = `SELECT user_id, username, password_hash, activated FROM users WHERE username = ?`;
    db.get(sql, [username], async (err, user) => {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        if (!user) {
            return response.status(401).json({ error: 'Invalid username or password' });
        }
        if (!user.activated) {
            return response.status(403).json({ error: 'Account is not activated. Please check your email for the activation link.' });
        }
        try {
            const passwordMatch = await bcrypt.compare(password, user.password_hash);

            if (!passwordMatch) {
                return response.status(401).json({ error: 'Invalid username or password' });
            }
            response.json({ message: 'Login successful', userId: user.user_id });
        } catch (error) {
            console.error('Error during login:', error);
            response.status(500).json({ error: 'Internal server error' });
        }
    });
});

// confirm user account

router.put('/activate/:confirmationToken', async (request, response) => {
    const { confirmationToken } = request.params;

    try {
        // parse the token to ensure account is present
        const [userId, phoneNumber] = confirmationToken.split('-');

        // trust but verify
        const sql = `SELECT * FROM users WHERE user_id = ? AND phoneNumber = ? AND activated = 0`;
        db.get(sql, [userId, phoneNumber], async (err, user) => {
            if (err) {
                console.error(err.message);
                return response.status(500).json({ error: 'Internal server error' });
            }

            if (!user) {
                return response.status(400).json({ error: 'Invalid or expired confirmation token' });
            }

            // activate the user's account
            const updateSql = `UPDATE users SET activated = 1 WHERE user_id = ?`;
            db.run(updateSql, [userId], function(err) {
                if (err) {
                    console.error(err.message);
                    return response.status(500).json({ error: 'Internal server error' });
                }

                response.json({ message: 'Account activated successfully' });
            });
        });
    } catch (error) {
        console.error('Error activating account:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
});


// send the password reset email
router.post('/forgot-password', (request, response) => {
    const { email, username } = request.body;

    // validate
    if (!email || !username) {
        return response.status(400).json({ error: 'Email and username are required' });
    }

    // check if the user exists in the database
    const sql = 'SELECT * FROM users WHERE email = ? AND username = ?';
    db.get(sql, [email, username], (err, user) => {
        if (err) {
            console.error('Error checking user:', err);
            return response.status(500).json({ error: 'Internal server error' });
        }

        if (!user) {
            return response.status(404).json({ error: 'User not found' });
        }

        // generate the reset token
        const resetToken = `${user.user_id}-${user.phoneNumber}`;

        // store the reset token in the database, associated with the user's account
        const updateSql = 'UPDATE users SET reset_token = ? WHERE user_id = ?';
        db.run(updateSql, [resetToken, user.user_id], (err) => {
            if (err) {
                console.error('Error updating reset token:', err);
                return response.status(500).json({ error: 'Internal server error' });
            }

            response.json({ success: true, resetToken: resetToken });
        });
    });
});

router.put('/reset-password/:resetToken', async (request, response) => {
    const { resetToken } = request.params;
    const { newPassword } = request.body;

    if (!newPassword) {
        return response.status(400).json({ error: 'New password is required' });
    }

    try {
        const [userId, phoneNumber] = resetToken.split('-');

        const sql = `SELECT * FROM users WHERE user_id = ? AND phoneNumber = ?`;
        db.get(sql, [userId, phoneNumber], async (err, user) => {
            if (err) {
                console.error(err.message);
                return response.status(500).json({ error: 'Internal server error' });
            }

            if (!user) {
                return response.status(400).json({ error: 'Invalid reset token' });
            }

            const passwordHash = await bcrypt.hash(newPassword, 10);

            const updateSql = `UPDATE users SET password_hash = ? WHERE user_id = ?`;
            db.run(updateSql, [passwordHash, userId], function(err) {
                if (err) {
                    console.error(err.message);
                    return response.status(500).json({ error: 'Internal server error' });
                }

                response.json({ message: 'Password reset successfully' });
            });
        });
    } catch (error) {
        console.error('Error resetting password:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;

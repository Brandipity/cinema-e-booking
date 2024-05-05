const express = require('express');
const router = express.Router();
const db = require('../db/database');
const bcrypt = require('bcrypt');

// add an admin
router.post('/', async (request, response) => {
    const { username, password, isAdmin } = request.body; // Receive isAdmin from frontend

    if (!username || !password || isAdmin === undefined) { // Check for missing fields
        return response.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const passwordHash = await bcrypt.hash(password, 10);

        const sql = `INSERT INTO admins (username, password_hash, isAdmin) VALUES (?, ?, ?)`; // Update SQL query

        db.run(sql, [username, passwordHash, isAdmin], function(err) {
            if (err) {
                console.error(err.message);
                response.status(500).json({ error: err.message });
                return;
            }
            response.json({ message: 'Admin added successfully', adminId: this.lastID });
        });
    } catch (error) {
        console.error('Error creating admin:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
});
// Endpoint to promote existing user to admin
router.post('/promoteUser', async (request, response) => {
    const { userId } = request.body;

    if (!userId) {
        return response.status(400).json({ error: 'Missing user ID' });
    }

    try {
        const sql = `UPDATE users SET isAdmin = ? WHERE userId = ?`;
        db.run(sql, [true, userId], function(err) {
            if (err) {
                console.error(err.message);
                response.status(500).json({ error: err.message });
                return;
            }
            response.json({ message: 'User promoted to admin successfully' });
        });
    } catch (error) {
        console.error('Error promoting user to admin:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
});

// update an admin
router.put('/:adminId', (request, response) => {
    const { adminId } = request.params;
    const { username, passwordHash } = request.body;

    let sql = 'UPDATE admins SET ';
    const params = [];

    if (username) {
        sql += 'username = ?';
        params.push(username);
    }

    if (passwordHash) {
        if (params.length > 0) sql += ', ';
        sql += 'password_hash = ?';
        params.push(passwordHash);
    }

    sql += ' WHERE admin_id = ?';
    params.push(adminId);

    db.run(sql, params, function(err) {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        response.json({ message: 'Admin updated successfully', changes: this.changes });
    });
});

// delete an admin
router.delete('/:adminId', (request, response) => {
    const { adminId } = request.params;

    const sql = 'DELETE FROM admins WHERE admin_id = ?';

    db.run(sql, adminId, function(err) {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        response.json({ message: 'Admin deleted successfully', changes: this.changes });
    });
});

// login
router.post('/adminLogin', async (request, response) => {
    const { username, password } = request.body;

    if (!username || !password) {
        return response.status(400).json({ error: 'Missing required fields' });
    }

    const sql = `SELECT * FROM admins WHERE username = ?`;

    db.get(sql, [username], async (err, admin) => {
        if (err) {
            console.error(err.message);
            return response.status(500).json({ error: 'Internal server error' });
        }

        if (!admin) {
            return response.status(401).json({ error: 'Invalid username or password' });
        }

        try {
            const passwordMatch = await bcrypt.compare(password, admin.password_hash);

            if (!passwordMatch) {
                return response.status(401).json({ error: 'Invalid username or password' });
            }

            // success
            response.json({ message: 'Admin login successful', adminId: admin.admin_id });
        } catch (error) {
            console.error('Error during password comparison:', error);
            response.status(500).json({ error: 'Internal server error' });
        }
    });
});

module.exports = router;

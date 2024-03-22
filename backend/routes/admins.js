const express = require('express');
const router = express.Router();
const db = require('../db/database');

// add an admin
router.post('/', (request, response) => {
    const { username, passwordHash } = request.body;

    if (!username || !passwordHash) {
        return response.status(400).json({ error: 'Missing required fields' });
    }

    const sql = `INSERT INTO admins (username, password_hash) VALUES (?, ?)`;

    db.run(sql, [username, passwordHash], function(err) {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        response.json({ message: 'Admin added successfully', adminId: this.lastID });
    });
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

module.exports = router;

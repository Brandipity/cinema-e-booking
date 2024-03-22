const express = require('express');
const router = express.Router();
const db = require('../db/database');

// add a new ticket type
router.post('/', (request, response) => {
    const { typeName, description, price } = request.body;

    if (!typeName || price == null) {
        return response.status(400).json({ error: 'Missing required fields: typeName and price are required' });
    }

    const sql = `INSERT INTO ticket_types (type_name, description, price) VALUES (?, ?, ?)`;

    db.run(sql, [typeName, description || '', price], function(err) {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        response.json({ message: 'Ticket type added successfully', typeId: this.lastID });
    });
});

// get all ticket types
router.get('/', (request, response) => {
    const sql = `SELECT * FROM ticket_types`;

    db.all(sql, [], (err, ticketTypes) => {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        response.json(ticketTypes);
    });
});

// update a ticket type's details
router.put('/:typeId', (request, response) => {
    const { typeId } = request.params;
    const { description, price } = request.body;

    if (price == null) {
        return response.status(400).json({ error: 'Missing required field: price' });
    }

    const sql = `UPDATE ticket_types SET description = ?, price = ? WHERE type_id = ?`;

    db.run(sql, [description, price, typeId], function(err) {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        response.json({ message: 'Ticket type updated successfully', changes: this.changes });
    });
});

// delete a ticket type
router.delete('/:typeId', (request, response) => {
    const { typeId } = request.params;

    const sql = 'DELETE FROM ticket_types WHERE type_id = ?';

    db.run(sql, [typeId], function(err) {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        response.json({ message: 'Ticket type deleted successfully', changes: this.changes });
    });
});

module.exports = router;

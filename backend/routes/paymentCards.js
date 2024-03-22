const express = require('express');
const router = express.Router();
const db = require('../db/database');

// add a new payment card
router.post('/', (request, response) => {
    const { userId, cardNumber, expiryDate, cardholderName, securityCode } = request.body;

    if (!userId || !cardNumber || !expiryDate || !cardholderName || !securityCode) {
        return response.status(400).json({ error: 'Missing required fields' });
    }

    const sql = `INSERT INTO payment_cards (user_id, card_number, expiry_date, cardholder_name, security_code) VALUES (?, ?, ?, ?, ?)`;

    db.run(sql, [userId, cardNumber, expiryDate, cardholderName, securityCode], function(err) {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        response.json({ message: 'Payment card added successfully', cardId: this.lastID });
    });
});

// get all payment cards for a user
router.get('/:userId', (request, response) => {
    const { userId } = request.params;

    const sql = `SELECT card_id, card_number, expiry_date, cardholder_name FROM payment_cards WHERE user_id = ?`;

    db.all(sql, [userId], (err, cards) => {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        response.json(cards);
    });
});

// update a payment card's details
router.put('/:cardId', (request, response) => {
    const { cardId } = request.params;
    const { expiryDate, cardholderName } = request.body;

    if (!expiryDate || !cardholderName) {
        return response.status(400).json({ error: 'Missing required fields' });
    }

    const sql = `UPDATE payment_cards SET expiry_date = ?, cardholder_name = ? WHERE card_id = ?`;

    db.run(sql, [expiryDate, cardholderName, cardId], function(err) {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        response.json({ message: 'Payment card updated successfully', changes: this.changes });
    });
});

// Endpoint to delete a payment card
router.delete('/:cardId', (request, response) => {
    const { cardId } = request.params;

    const sql = 'DELETE FROM payment_cards WHERE card_id = ?';

    db.run(sql, [cardId], function(err) {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        response.json({ message: 'Payment card deleted successfully', changes: this.changes });
    });
});

module.exports = router;

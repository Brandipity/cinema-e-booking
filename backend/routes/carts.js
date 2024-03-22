const express = require('express');
const router = express.Router();
const db = require('../db/database');

// create a new cart
router.post('/', (request, response) => {
    const { userId } = request.body;

    if (!userId) {
        return response.status(400).json({ error: 'Missing required field: userId' });
    }

    const sql = `INSERT INTO carts (user_id, created_at) VALUES (?, datetime('now'))`;

    db.run(sql, [userId], function(err) {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        response.json({ message: 'Cart created successfully', cartId: this.lastID });
    });
});

// get a cart by cartId
router.get('/:cartId', (request, response) => {
    const { cartId } = request.params;

    const sql = `SELECT * FROM carts WHERE cart_id = ?`;

    db.get(sql, [cartId], (err, cart) => {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        if (cart) {
            response.json(cart);
        } else {
            response.status(404).json({ message: "Cart not found." });
        }
    });
});

// update a cart's user_id (or other details)
router.put('/:cartId', (request, response) => {
    const { cartId } = request.params;
    const { userId } = request.body;

    if (!userId) {
        return response.status(400).json({ error: 'Missing required field: userId' });
    }

    const sql = `UPDATE carts SET user_id = ? WHERE cart_id = ?`;

    db.run(sql, [userId, cartId], function(err) {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        response.json({ message: 'Cart updated successfully', changes: this.changes });
    });
});

// delete a cart
router.delete('/:cartId', (request, response) => {
    const { cartId } = request.params;

    const sql = 'DELETE FROM carts WHERE cart_id = ?';

    db.run(sql, [cartId], function(err) {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        response.json({ message: 'Cart deleted successfully', changes: this.changes });
    });
});

module.exports = router;

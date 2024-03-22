const express = require('express');
const router = express.Router();
const db = require('../db/database');

// add an item to a cart
router.post('/', (request, response) => {
    const { cartId, screeningId, typeId, quantity } = request.body;

    if (!cartId || !screeningId || !typeId || !quantity) {
        return response.status(400).json({ error: 'Missing required fields' });
    }

    const sql = `INSERT INTO cart_items (cart_id, screening_id, type_id, quantity) VALUES (?, ?, ?, ?)`;

    db.run(sql, [cartId, screeningId, typeId, quantity], function(err) {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        response.json({ message: 'Item added to cart successfully', itemId: this.lastID });
    });
});

// update an item's quantity in a cart
router.put('/:itemId', (request, response) => {
    const { itemId } = request.params;
    const { quantity } = request.body;

    if (!quantity) {
        return response.status(400).json({ error: 'Missing required field: quantity' });
    }

    const sql = `UPDATE cart_items SET quantity = ? WHERE item_id = ?`;

    db.run(sql, [quantity, itemId], function(err) {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        response.json({ message: 'Item quantity updated successfully', changes: this.changes });
    });
});

// remove an item from a cart
router.delete('/:itemId', (request, response) => {
    const { itemId } = request.params;

    const sql = 'DELETE FROM cart_items WHERE item_id = ?';

    db.run(sql, itemId, function(err) {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        response.json({ message: 'Item removed from cart successfully', changes: this.changes });
    });
});

// get all items in a specific cart
router.get('/:cartId', (request, response) => {
    const { cartId } = request.params;
    // also grabs relevant details about a selected showtime
    // pretty cool
    const sql = `
        SELECT ci.item_id, ci.quantity, ci.screening_id, ci.type_id, m.title, s.screening_start, tt.type_name, tt.price
        FROM cart_items ci
        JOIN screenings s ON ci.screening_id = s.screening_id
        JOIN movies m ON s.movie_id = m.movie_id
        JOIN ticket_types tt ON ci.type_id = tt.type_id
        WHERE ci.cart_id = ?
    `;

    db.all(sql, [cartId], (err, items) => {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        if (items.length > 0) {
            response.json({ cartId: cartId, items: items });
        } else {
            response.status(404).json({ message: "No items found in this cart." });
        }
    });
});


module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../db/database');
const sendPromotionEmail = require('./emailSender'); // Import the sendPromotionEmail function
 
// add a new promotion
router.post('/', async (request, response) => {
    const { promoCode, description, discountPercentage, validFrom, validUntil } = request.body;

    if (!promoCode || (discountPercentage === null || discountPercentage === undefined) || !validFrom || !validUntil) {
        return response.status(400).json({ error: 'Missing required fields' });
    }

    if (typeof discountPercentage !== 'number' || discountPercentage < 0 || discountPercentage > 100) {
        return response.status(400).json({ error: 'Invalid discount percentage' });
    }

    try {
        const sql = `INSERT INTO promotions (promo_code, description, discount_percentage, valid_from, valid_until) VALUES (?, ?, ?, ?, ?)`;
        const dbResponse = await db.run(sql, [promoCode, description, discountPercentage, validFrom, validUntil]);
        const newPromotionId = dbResponse.lastID;

        // Construct promotion content
        const promotionContent = `${promoCode} - ${description} (Discount: ${discountPercentage}%)`;

        // Send email to users
        await sendPromotionEmail(promotionContent);

        response.json({ message: 'Promo added successfully' });
    } catch (error) {
        console.error('Error adding promotion:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
});

// get all promotions
router.get('/', async (request, response) => {
    const sql = `SELECT * FROM promotions`;

    db.all(sql, [], (err, promotions) => {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        response.json(promotions);
    });
});

// update a promotion's details
router.put('/:promoId', (request, response) => {
    const { promoId } = request.params;
    const { description, discountPercentage, validFrom, validUntil } = request.body;
    const sql = `UPDATE promotions SET description = ?, discount_percentage = ?, valid_from = ?, valid_until = ? WHERE promo_id = ?`;

    db.run(sql, [description, discountPercentage, validFrom, validUntil, promoId], function(err) {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        response.json({ message: 'Promotion updated successfully', changes: this.changes });
    });
});

// delete a promotion
router.delete('/:promoId', (request, response) => {
    const { promoId } = request.params;

    const sql = 'DELETE FROM promotions WHERE promo_id = ?';

    db.run(sql, [promoId], function(err) {
        if (err) {
            console.error(err.message);
            response.status(500).json({ error: err.message });
            return;
        }
        response.json({ message: 'Promotion deleted successfully', changes: this.changes });
    });
});

module.exports = router;

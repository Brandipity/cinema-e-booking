const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { sendPromotionEmail } = require('./emailSender'); // Import the sendPromotionEmail function

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

        // Send promotion email
        await sendPromotionEmail(promoCode); 

        response.json({ message: 'Promo added successfully' });
    } catch (error) {
        console.error('Error adding promotion:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;


// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const moviesRoutes = require('./routes/movies');
const cartItemsRoutes = require('./routes/cartItems');
const bookingsRoutes = require('./routes/bookings');
const adminsRoutes = require('./routes/admins');
const cartsRoutes = require('./routes/carts');
const paymentCardsRoutes = require('./routes/paymentCards');
const promotionsRoutes = require('./routes/promotions');
const screeningsRoutes = require('./routes/screenings');
const theatersRoutes = require('./routes/theaters');
const ticketTypesRoutes = require('./routes/ticketTypes');
const usersRoutes = require('./routes/users');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// mount routes
app.use('/api/movies', moviesRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/admins', adminsRoutes);
app.use('/api/cart-items', cartItemsRoutes);
app.use('/api/carts', cartsRoutes);
app.use('/api/payment-cards', paymentCardsRoutes);
app.use('/api/promotions', promotionsRoutes);
app.use('/api/screenings', screeningsRoutes);
app.use('/api/theaters', theatersRoutes);
app.use('/api/ticket-types', ticketTypesRoutes);
app.use('/api/users', usersRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
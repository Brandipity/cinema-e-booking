# Database Endpoints Documentation

## Base URL

The base URL for the endpoints is `http://localhost:3000/api`. 

---

## Movies

### Add a Movie

- **POST** `/movies`
- **Body**: `{"title": "Inception", "description": "A thief...", "releaseDate": "2010-07-16"}`
- Adds a new movie to the system.

### Get Now Playing Movies

- **GET** `/movies/now-playing`
- Retrieves a list of movies currently playing.

---

## Screenings

### Add a Screening

- **POST** `/screenings`
- **Body**: `{"movieId": 1, "theaterNumber": 5, "screeningStart": "2023-05-01T19:00:00", "seatsAvailable": 150}`
- Adds a new screening for a movie.

### Get Screenings for a Movie

- **GET** `/screenings/movie/:movieId`
- Retrieves all screenings for a given movie.

---

## Theaters

### Add a Theater

- **POST** `/theaters`
- **Body**: `{"theaterNumber": 5, "capacity": 150}`
- Adds a new theater to the system.

### Get All Theaters

- **GET** `/theaters`
- Retrieves all theaters.

---

## Ticket Types

### Add a Ticket Type

- **POST** `/ticket-types`
- **Body**: `{"typeName": "Adult", "price": 12.99}`
- Adds a new ticket type (options are Senior, Adult, and Child).

### Get All Ticket Types

- **GET** `/ticket-types`
- Retrieves all ticket types.

---

## Users

### Add a User

- **POST** `/users`
- **Body**: `{"username": "teamA9", "email": "teamA9@whatever.com", "password": "hunter2"}`
- Adds a new user to the system.

### Get User Details

- **GET** `/users/:userId`
- Retrieves details for a specific user.

---

## Cart Items

### Add an Item to Cart

- **POST** `/cart-items`
- **Body**: `{"cartId": 1, "screeningId": 2, "typeId": 1, "quantity": 3}`
- Adds a new item to a user's shopping cart.

### Get All Items in Cart

- **GET** `/cart-items/:cartId`
- Retrieves all items in a specific cart.

---

## Payment Cards

### Add a Payment Card

- **POST** `/payment-cards`
- **Body**: `{"userId": 1, "cardNumber": "1234567890123456", "expiryDate": "12/24", "cardholderName": "Team A9"}`
- Adds a new payment card for a user.

### Get All Payment Cards for a User

- **GET** `/payment-cards/:userId`
- Retrieves all payment cards associated with a user.

---

## Promotions

### Add a Promotion

- **POST** `/promotions`
- **Body**: `{"promoCode": "SAVE20", "description": "20% off", "discountPercentage": 20, "validFrom": "2023-01-01", "validUntil": "2023-12-31"}`
- Adds a new promotion.

### Get All Promotions

- **GET** `/promotions`
- Retrieves all promotions.

---


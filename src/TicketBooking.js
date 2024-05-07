
import React, { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import './TicketBooking.css';
import { getUserIdFromToken } from './utils/auth';
import axios from "axios";

function TicketBooking() {
    const location = useLocation();
    const movie = location.state ? location.state.movie : null;
    const [selectedShowtime, setSelectedShowtime] = useState('');
    const [selectedAge, setSelectedAge] = useState('');
    const [selectedSeatLetter, setSelectedSeatLetter] = useState('');
    const [selectedSeatNumber, setSelectedSeatNumber] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [showtimes, setShowtimes] = useState([]);

    useEffect(() => {
        const checkLoginStatus = () => {
            const token = localStorage.getItem('token');
            setIsLoggedIn(!!token);
        };

        checkLoginStatus();
    }, []);

    useEffect(() => {
        const fetchMovieId = async () => {
            if (movie && movie.title) {
                try {
                    const response = await axios.get(`http://localhost:3001/api/movies/find-by-title`, {
                        params: { title: movie.title }
                    });
                    console.log("Movie fetched with ID:", response.data);
                    fetchShowtimes(response.data.movie_id);
                } catch (error) {
                    console.error('Error fetching movie ID:', error);
                }
            }
        };

        const fetchShowtimes = async (movieId) => {
            try {
                const response = await axios.get(`http://localhost:3001/api/screenings/movie/${movieId}`);
                setShowtimes(response.data);
            } catch (error) {
                console.error('Error fetching showtimes:', error);
            }
        };

        fetchMovieId();
    }, [movie]); // This effect depends on 'movie'

    if (!movie) {
        return <Navigate to="/" replace />;
    }

    const handleShowtimeChange = (e) => {
        setSelectedShowtime(e.target.value);
    };

    const handleAgeChange = (e) => {
        setSelectedAge(e.target.value);
    };

    const handleSeatLetterChange = (e) => {
        setSelectedSeatLetter(e.target.value);
    };

    const handleSeatNumberChange = (e) => {
        setSelectedSeatNumber(e.target.value);
    };

    const handleBookMovie = async () => {
        if (!isLoggedIn) {
            // Display an error message or redirect to the login page
            alert('You must be a registered user to book a ticket.');
            navigate('/login');
            return;
        }

        // Prepare the booking data
        const bookingData = {
            userId: getUserIdFromToken(),
            screeningId: selectedShowtime,
            numSeats: 1,
            seat: `${selectedSeatLetter}${selectedSeatNumber}`,
            confirmed: 'FALSE',
            bookingTime: new Date().toISOString(),
        };

        try {
            // Send the booking data to the server
            const response = await axios.post('http://localhost:3001/api/bookings', bookingData);

            if (response.data.bookingId) {
                // Booking added to cart successfully
                console.log('Booking added to cart. Booking ID:', response.data.bookingId);

                // Create a cart entry for the booking
                const cartData = {
                    userId: getUserIdFromToken(),
                    bookingId: response.data.bookingId,
                };

                const cartResponse = await axios.post('http://localhost:3001/api/carts', cartData);

                if (cartResponse.data.cartId) {
                    console.log('Cart created. Cart ID:', cartResponse.data.cartId);
                    // Redirect to the cart page or display a success message
                    navigate('/cart');
                } else {
                    console.error('Failed to create cart. Server response:', cartResponse.data);
                    alert('Failed to add the ticket to the cart. Please try again later.');
                }
            } else {
                console.error('Failed to add booking to cart. Server response:', response.data);
                alert('Failed to add the ticket to the cart. Please try again later.');
            }
        } catch (error) {
            console.error('Error adding booking to cart:', error);
            alert('An error occurred while adding the ticket to the cart. Please try again later.');
        }
    };

    return (
        <div className="ticket-booking">
            {/* Navbar */}
            <nav className="navbar">
                <div className="navbar-left">
                    <span>E-CINEMA</span>
                </div>
                <div className="navbar-center">
                    <input type="text" placeholder="Search" />
                </div>
                <div className="navbar-right">
                    <a href="#">Home</a>
                    <a href="#">Showings</a>
                    <a href="/login">Login</a>
                    <a href="/cart">Cart</a>
                </div>
            </nav>

            <div className="content-area">
                <div className="movie-details">
                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                    <div>
                        <h2>{movie.title}</h2>
                        <p>{movie.overview}</p>
                    </div>
                </div>
            </div>

            <div className="dropdowns">
                <div className="showtime-area">
                    {/* Showtime dropdown */}
                    <label htmlFor="showtimes" className="showtime-label">Choose a showtime:</label>
                    <select id="showtimes" name="showtimes" value={selectedShowtime} onChange={handleShowtimeChange}>
                        <option value="">Select a showtime</option>
                        {showtimes.map((showtime) => (
                            <option key={showtime.screening_id} value={showtime.screening_id}>
                                {new Date(showtime.screening_start).toLocaleString()}
                            </option>
                        ))}
                    </select>

                    {/* Age dropdown */}
                    <label>Ticket Age:</label>
                    <select id="age" name="age" value={selectedAge} onChange={handleAgeChange}>
                        <option value="">Select an age</option>
                        <option value="Child">Child</option>
                        <option value="Adult">Adult</option>
                        <option value="Senior">Senior</option>
                    </select>
                </div>
                <div className="seat">
                    {/* Seat letter dropdown */}
                    <label>Seat Letter:</label>
                    <select id="seatLetter" name="seatLetter" value={selectedSeatLetter} onChange={handleSeatLetterChange}>
                        <option value="">Select a seat letter</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </select>

                    {/* Seat number dropdown */}
                    <label>Seat Number:</label>
                    <select id="seatNumber" name="seatNumber" value={selectedSeatNumber} onChange={handleSeatNumberChange}>
                        <option value="">Select a seat number</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>

                    {/* Book movie button */}
                    <button onClick={handleBookMovie}>Add to Cart</button>
                </div>
            </div>

            <footer className="footer">
                <div className="footer-category">
                    <h3>Account</h3>
                    <ul>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/createaccount">Create Account</a></li>
                    </ul>
                </div>

                <div className="footer-category">
                    <h3>View Bookings</h3>
                    <ul>
                        <li>View Theaters</li>
                        <li>Promotions & Deals</li>
                    </ul>
                </div>

                <div className="footer-category">
                    <h3>Contact</h3>
                    <ul>
                        <li>Email</li>
                        <li>Creators</li>
                    </ul>
                </div>
            </footer>
        </div>
    );
}

export default TicketBooking;



// TicketBooking.js

// this file uses some JSX formatting, just trying it out

import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import './TicketBooking.css';

function TicketBooking() {

    const location = useLocation();
    // prevents bad shit from happening if you use the navbar on this page
    const movie = location.state ? location.state.movie : null;

    // see above
    if (!movie) {
        return <Navigate to="/" replace />;
    }

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

                <div className="showtime-area">
                    {/* dropdown */}
                    <label htmlFor="showtimes" className="showtime-label">Choose a showtime:</label>
                    <select id="showtimes" name="showtimes">
                        <option value="1">14:00</option>
                        <option value="2">16:00</option>
                        <option value="3">18:00</option>
                        <option value="4">20:00</option>
                        <option value="5">22:00</option>
                    </select>
                    {/* we do a little testing */}
                    <button onClick={() => console.log("Add Showtime Clicked")}>Add Showtime</button>

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





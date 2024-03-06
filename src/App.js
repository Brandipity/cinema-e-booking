import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import GuestPage from './GuestPage';
import CreateAccount from './CreateAccount';
import RegisteredUser from './RegisteredUser';
import ManageAccount from './ManageAccount';
import OrderConfirmation from './OrderConfirmation';
import Admin from './Admin';
import ManagePromotions from './ManagePromotions';
import ManageMovies from './ManageMovies';
import Cart from './Cart'
import OrderSummary from './OrderSummary';
import TicketBooking from "./TicketBooking";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/guest" element={<GuestPage />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/ticketbooking" element={<TicketBooking />} />
        <Route path="/registereduser" element={<RegisteredUser />} />
        <Route path="/manageaccount" element={<ManageAccount />} />
        <Route path="/orderconfirmation" element={<OrderConfirmation />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/managepromotions" element={<ManagePromotions />} />
        <Route path="/managemovies" element={<ManageMovies />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/ordersummary" element={<OrderSummary />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;

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
import AdminLogin from './AdminLogin';
import AdminCreateAccount from './AdminCreateAccount';
import ForgotPassword from './ForgotPassword';
import ConfirmationPage from './ConfirmationPage';
import ConfirmationSent from './ConfirmationSent';
import ResetPassword from './ResetPassword';


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
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admincreateaccount" element={<AdminCreateAccount/>} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        <Route path="/confirm/:token" element={<ConfirmationPage />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        <Route path="/confirmation-sent" element={<ConfirmationSent />} />
      </Routes>
    </Router>
  );
}

export default App;

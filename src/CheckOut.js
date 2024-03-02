import React from 'react';
import './CheckOut.css';
import { Link } from 'react-router-dom';

function CheckOut() {
  const handleConfirm = () => {
    // console.log for confirming the checkout
    console.log("Checkout confirmed!");
  };

  const handleCancel = () => {
    // console.log for canceling the checkout
    console.log("Checkout canceled!");
  };

  return (
    <><div className="navbar">
          <h2>Checkout</h2>
          <div className="navbar-right">
          <a href="/registereduser">Home</a>
          <a href="/registereduser">Showings</a>
          <a href="/cart">Cart</a>
          </div>
      </div><div className="App">
              <form>
                  {/* add checkout form fields here */}
              </form>

              <div className="main-content">
                  <button onClick={handleConfirm}>Confirm</button>
                  <button onClick={handleCancel}><Link to="/ordersummary">Cancel</Link></button>
              </div>
          </div></>
  );
}

export default CheckOut;

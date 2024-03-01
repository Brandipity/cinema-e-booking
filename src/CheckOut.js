import React from 'react';

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
          <a href="#">Showings</a>
          <a href="/cart">Cart</a>
          </div>
      </div><div className="App">
              <form>
                  {/* add checkout form fields here */}
              </form>

              <div className="main-content">
                  <button onClick={handleConfirm}>Confirm</button>
                  <button onClick={handleCancel}>Cancel</button>
              </div>
          </div></>
  );
}

export default CheckOut;

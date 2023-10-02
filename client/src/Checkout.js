import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Checkout.css';

function Checkout() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    address: '',
    payment_card: '',
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItemsState, setCartItemsState] = useState([]); // Define cartItemsState

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function placeOrder() {
    const cartItems = cartItemsState.map((cartItem) => ({
      product_id: cartItem.product.id,
      quantity: cartItem.quantity,
    }));

    const requestBody = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      address: formData.address,
      payment_card: formData.payment_card,
      cartItems: cartItems,
      order_date: new Date().toISOString(),
    };

    const url = '/place_order';
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (response.status === 201) {
          alert('Order placed successfully');
          // You can also redirect to a confirmation page or perform other actions
        } else if (response.status === 401) {
          alert('Please log in to place an order');
        } else {
          alert('Error placing the order');
        }
      })
      .catch((error) => {
        console.error('Error placing order:', error);
        alert('Error placing the order');
      });
  }

  useEffect(() => {
    axios
      .get('/check_session')
      .then((response) => {
        const user = response.data;
        if (user.id) {
          axios.get(`/users/${user.id}`).then((userData) => {
            const {
              first_name,
              last_name,
              address,
              payment_card,
            } = userData.data;

            setFormData({
              first_name,
              last_name,
              address,
              payment_card,
            });
          });
        }
      })
      .catch((error) => {
        console.error('Error checking session:', error);
      });

    axios
      .get('/cart/user')
      .then((response) => {
        const cartItems = response.data.cart_items;
        const totalPrice = cartItems.reduce((total, item) => {
          return total + item.product.price * item.quantity;
        }, 0);
        setTotalPrice(totalPrice);
        setCartItemsState(cartItems); // Set cart items to cartItemsState
      })
      .catch((error) => {
        console.error('Error fetching cart items:', error);
      });
  }, []);

  function handleShipping(totalPrice) {
    if (totalPrice === 0) {
      return 0;
    } else {
      return 8.99;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    placeOrder(); // Call the placeOrder function here
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 col-md-7 col-sm-6">
          <h1 className="checkout-title">Checkout</h1>
          <br></br>
          <br></br>
          <div className="card order">
            <div className="card-body">
              <h2 className="card-title">Order Review</h2>
              <br></br>
              <p className="card-text">
                <span className="black-text">Total Price: </span>
                <span style={{ color: 'blue', float: 'right' }}>
                  ${totalPrice}
                </span>
              </p>
              <p className="card-text">
                <span className="black-text">Shipping and Handling: </span>
                <span style={{ color: 'blue', float: 'right' }}>
                  ${handleShipping(totalPrice)}
                </span>
              </p>
              <p className="card-text">
                <span className="black-text">GST/HST: </span>
                <span style={{ color: 'blue', float: 'right' }}>
                  ${(totalPrice * 0.12).toFixed(2)}
                </span>
              </p>
              <p className="card-text">
                <span className="black-text">Total Before Tax: </span>
                <span style={{ color: 'blue', float: 'right' }}>
                  ${(totalPrice + handleShipping(totalPrice)).toFixed(2)}
                </span>
              </p>
              <p className="card-text">
                <span className="black-text">Grade Total: </span>
                <span style={{ color: 'blue', float: 'right' }}>
                  ${(
                    totalPrice +
                    handleShipping(totalPrice) +
                    totalPrice * 0.12
                  ).toFixed(2)}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-5 col-sm-6 signup-form">
          <div>
            <h2>Checkout Form</h2>
            <br></br>
            <br></br>
            <div className="card user-info">
              <div className="card-body">
                <h2 className="card-title">User Information</h2>
                <div className="card-text">
                  <br></br>
                  <p>
                    <span className="black-text">First Name:</span>
                    <span style={{ color: 'blue', float: 'right' }}>
                      {formData.first_name}
                    </span>
                  </p>
                  <p>
                    <span className="black-text">Last Name:</span>
                    <span style={{ color: 'blue', float: 'right' }}>
                      {formData.last_name}
                    </span>
                  </p>
                  <p>
                    <span className="black-text">Address:</span>
                    <span style={{ color: 'blue', float: 'right' }}>
                      {formData.address}
                    </span>
                  </p>
                  <p>
                    <span className="black-text">Card Number:</span>
                    <span style={{ color: 'blue', float: 'right' }}>
                      {formData.payment_card}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <br></br>
              <div>
                <label className="form-label">CVV:</label>
                <input
                  type="text"
                  className="form-control"
                  id="cvv"
                  name="cvv"
                  inputMode="numeric"
                  maxLength="3"
                  onChange={handleChange}
                  required
                />
              </div>
              <br></br>
              <button
                type="submit"
                className="btn btn-secondary"
                onSubmit={placeOrder} // Call the placeOrder function on button click
              >
                Place Your Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

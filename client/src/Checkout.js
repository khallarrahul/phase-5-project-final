import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom'
import './Checkout.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Checkout() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    address: '',
    payment_card: '',
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItemsState, setCartItemsState] = useState([]);

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
        setCartItemsState(cartItems);
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
    if (
      !formData.cardholder_name ||
      !formData.card_number ||
      !formData.expiration_date ||
      !formData.cvv
    ) {
      alert('Please fill in all card details');
      return; 
    }
    placeOrder();
  };
  

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 col-md-7 col-sm-6">
          <h1 className="checkout-title">Checkout</h1>
          <br />
          <br />
          <div className="card order">
            <div className="card-body">
              <h2 className="card-title">Order Review</h2>
              <br />
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
            <div className="col-lg-5">
              <div className="card bg-primary text-white rounded-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="mb-0">Card details</h1>
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <p>
                    <span className="black-text">First Name:</span>
                    <span style={{ float: 'right' }}>
                      {formData.first_name}
                    </span>
                  </p>
                  <p>
                    <span className="black-text">Last Name:</span>
                    <span style={{ float: 'right' }}>
                      {formData.last_name}
                    </span>
                  </p>
                  <p>
                    <span className="black-text">Address:</span>
                    <span style={{ float: 'right' }}>
                      {formData.address}
                    </span>
                  </p>
  
                  <p className="small mb-2">Card type</p>
                  <NavLink to="#!" className="text-white">
                    <i className="fab fa-cc-mastercard fa-2x me-2"></i>
                  </NavLink>
                  <NavLink to="#!" className="text-white">
                    <i className="fab fa-cc-visa fa-2x me-2"></i>
                  </NavLink>
                  <NavLink to="#!" className="text-white">
                    <i className="fab fa-cc-amex fa-2x me-2"></i>
                  </NavLink>
                  <NavLink to="#!" className="text-white">
                    <i className="fab fa-cc-paypal fa-2x"></i>
                  </NavLink>
  
                  <form className="mt-4" onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                      <input
                        type="text"
                        id="typeName"
                        className="form-control form-control-lg"
                        size="17"
                        placeholder="Cardholder's Name"
                        name="cardholder_name"
                        value={formData.cardholder_name}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-label" htmlFor="typeName">
                        Cardholder's Name
                      </label>
                    </div>
  
                    <div className="form-group mb-4">
                      <input
                        type="text"
                        id="typeText"
                        className="form-control form-control-lg"
                        placeholder="1234 5678 9012 3457"
                        name="card_number"
                        value={formData.card_number}
                        onChange={handleChange}
                        maxLength="19"
                        required
                      />
                      <label className="form-label" htmlFor="typeText">
                        Card Number
                      </label>
                    </div>
  
                    <div className="row mb-4">
                      <div className="col-md-6">
                        <div className="form-group mb-4">
                          <input
                            type="text"
                            id="typeExp"
                            className="form-control form-control-lg"
                            placeholder="MM/YYYY"
                            name="expiration_date"
                            value={formData.expiration_date}
                            onChange={handleChange}
                            maxLength="7"
                            required
                          />
                          <label className="form-label" htmlFor="typeExp">
                            Expiration
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-4">
                          <input
                            type="password"
                            id="typeText"
                            className="form-control form-control-lg"
                            placeholder="&#9679;&#9679;&#9679;"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            maxLength="3"
                            required
                          />
                          <label className="form-label" htmlFor="typeText">
                            CVV
                          </label>
                        </div>
                      </div>
                    </div>
  
                    <button
                      type="submit"
                      className="btn btn-secondary"
                      onClick={placeOrder}
                      disabled={
                        !/^[A-Za-z\s]+$/.test(formData.cardholder_name) ||
                        !/^[0-9]+$/.test(formData.card_number) ||
                        !formData.expiration_date ||
                        !formData.cvv
                      }
                    >
                      Place Your Order
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

  );
}

export default Checkout;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Checkout.css'

function Checkout() { 
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    payment_card: '',
    cvv: '',
  });
  const [totalPrice, setTotalPrice] = useState(0);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Checkout form submitted with data:', formData);
  };

  useEffect(() => {
    axios.get('/cart/user') 
      .then(response => {
        const cartItems = response.data.cart_items;
        const totalPrice = cartItems.reduce((total, item) => {
          return total + item.product.price * item.quantity;
        }, 0);
        setTotalPrice(totalPrice);
      })
      .catch(error => {
        console.error('Error fetching cart items:', error);
      });
  }, []);

  function handleShipping(totalPrice){
    if (totalPrice === 0){
      return  0;
    } else{
      return 8.99;
    }
  }

  return (
    <div className="container mt-5">
  <div className="row">
    <div className="col-12 col-md-7 col-sm-6">
      <h1 className="checkout-title">Checkout</h1>
      <br></br>
      <br></br>
      <div className='card order'>
        <div className="card-body">
        <h2 className="card-title">Order Review</h2>
        <br></br>
          <p className="card-text">
            <span className="black-text">Total Price: </span>
            <span style={{ color: 'blue', float: 'right' }}>${totalPrice}</span>
          </p>
          <p className="card-text">
            <span className="black-text">Shipping and Handling: </span>
            <span style={{ color: 'blue', float: 'right'}}>${handleShipping(totalPrice)}</span>
          </p>
          <p className="card-text">
            <span className="black-text">GST/HST: </span>
            <span style={{ color: 'blue', float: 'right'}}>${(totalPrice * 0.12)}</span>
          </p>
          <p className="card-text">
            <span className="black-text">Total Before Tax: </span>
            <span style={{ color: 'blue', float: 'right'}}>${(totalPrice + handleShipping(totalPrice))}</span>
          </p>
          <p className="card-text">
            <span className="black-text">Grade Total: </span>
            <span style={{ color: 'blue', float: 'right' }}>${(totalPrice + handleShipping(totalPrice) + totalPrice * 0.12).toFixed(2)}</span>
          </p>
        </div>
      </div>
    </div>
    <div className="col-12 col-md-5 col-sm-6 signup-form">
      <div>
        <h2>Checkout Form</h2>
        <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="first_name" className="form-label">First Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="last_name" className="form-label">Last Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="address" className="form-label">Address:</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="payment_card" className="form-label">Card Number:</label>
                <input
                  type="text"
                  className="form-control"
                  id="payment_card"
                  name="payment_card"
                  value={formData.payment_card}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="cvv" className="form-label">CVV:</label>
                <input
                  type="text"
                  className="form-control"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                />
              </div>
              <br></br>
              <button type="submit" className="btn btn-secondary">
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

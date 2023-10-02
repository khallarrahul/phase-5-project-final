import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Checkout.css'

function Checkout() { 
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    address: '',
    payment_card: '',
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
              ...formData,
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
      })
      .catch((error) => {
        console.error('Error fetching cart items:', error);
      });
  }, [formData]);

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
            <span style={{ color: 'blue', float: 'right'}}>${(totalPrice * 0.12).toFixed(2)}</span>
          </p>
          <p className="card-text">
            <span className="black-text">Total Before Tax: </span>
            <span style={{ color: 'blue', float: 'right'}}>${(totalPrice + handleShipping(totalPrice)).toFixed(2)}</span>
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
        <br></br>
        <br></br>
        <div className='card user-info'>
      
          <div className="card-body">
            <h2 className="card-title">User Information</h2>
            <div className="card-text">
            <br></br>
                <p>
                  <span className="black-text">First Name:</span>
                  <span style={{ color: 'blue', float: 'right' }}>{formData.first_name}</span>
                </p>
                <p>
                  <span className="black-text">Last Name:</span>
                  <span style={{ color: 'blue', float: 'right' }}>{formData.last_name}</span>
                </p>
                <p>
                  <span className="black-text">Address:</span>
                  <span style={{ color: 'blue', float: 'right' }}>{formData.address}</span>
                </p>
                <p>
                  <span className="black-text">Card Number:</span>
                  <span style={{ color: 'blue', float: 'right' }}>{formData.payment_card}</span>
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

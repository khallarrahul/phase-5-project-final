import React, { useState } from 'react';

function Checkout({ totalPrice }) { // Use the totalPrice prop
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    payment_card: '',
    cvv: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate a successful checkout process
    console.log('Checkout form submitted with data:', formData);
    // You can reset the form or perform other actions here
  };

  return (
    <div className="container mt-5">
      <h1>{" "}</h1>
      <div className="row">
        <h1 className="col-12 col-md-7 col-sm-6">
          Checkout
          <div className="col-12 col-ml-7 col-sm-8">
            <br></br>
            <h3>Order Review</h3>
            <h5>Total Price: ${totalPrice}</h5> {/* Use the totalPrice prop here */}
            <h5>Shipping and Handling: $8.99</h5> {/* You can replace this with actual shipping cost */}
            <h5>Tax (12%): ${(totalPrice * 0.12)}</h5> {/* Calculate tax based on total price */}
            <h5>Before Tax: ${(totalPrice + 8.99)}</h5> {/* Calculate before tax based on total price and shipping */}
            <h5>Subtotal: ${(totalPrice + 8.99 + totalPrice * 0.12)}</h5> {/* Calculate subtotal */}
          </div>
        </h1>
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

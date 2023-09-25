import React, { useState } from 'react';
import './Signup.css';
import { NavLink } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    address: '',
    phone_number: '',
    payment_card: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [registrationError, setRegistrationError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isEmailValid(formData.email)){
      setRegistrationError(true)
      setIsLoading(false)
      return
    }
    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then((response) => {
      if (response.status === 201) {
        setIsSubmitted(true);
        setRegistrationError(false);
        console.log('Registration Successful');
      } else if (response.status === 400) {
        response.json().then((data) => {
          console.log(data.error); // Set the error message
        });
      } else {
        setIsSubmitted(false);
        setRegistrationError(true);
        console.log('Registration failed');
      }
    })
      .catch((error) => {
        console.error('Error', error);
      });
    setTimeout(() => {
      setIsLoading(false);
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: '',
        address: '',
        phone_number: '',
        payment_card: '',
      });
      setRegistrationError(false)
    }, 2000);
  };

  return (
    <div className="container mt-5">
      <h1>{" "}</h1>
      <div className="row">
        <h1 className="col-12 col-md-7 col-sm-6">Welcome!</h1>
        <div className="col-12 col-md-5 col-sm-6 signup-form">
        {isSubmitted && !isLoading ? (
            <div>
              <h1>Thank you for signing up!</h1>
              <NavLink to="/login">
                <button className="btn btn-primary">Login Now</button>
              </NavLink>
              <br></br>
            </div>
          ) : registrationError ? (
            <div>
              <h1>Registration failed</h1>
            </div>
          ) : null}
          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
              <label htmlFor="first_name" className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
              <label htmlFor="last_name" className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
               <label htmlFor="address" className="form-label">Home Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
              <label htmlFor="phone_number" className="form-label">Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
              />
              <label htmlFor="payment_card" className="form-label">Payment Card</label>
              <input
                type="text"
                className="form-control"
                id="payment_card"
                name="payment_card"
                value={formData.payment_card}
                onChange={handleChange}
                required
              />
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
               <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <label htmlFor="_password_hash" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="_password_hash"
                name="_password_hash"
                value={formData._password_hash}
                onChange={handleChange}
                required
              />
              </div>
              <button type="submit" className="btn btn-primary">
                {isLoading ? 'Registering...' : 'Register'}  
              </button>
              <NavLink to='/login' > Already Registered? Login Here</NavLink>
            </form>
          )}
          
        </div>
      </div>
    </div>
  );
}

export default Signup;
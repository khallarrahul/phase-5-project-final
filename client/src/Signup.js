import React, {useState} from 'react'
import './Signup.css'

function Signup() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    address: "",
    phone_number: "",
    payment_card: ""
  })

  const handleChange = () => {
    return 
  }

  const handleSubmit = () => {
    return
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <h1 className="col-12 col-md-7 col-sm-6">
          Welcome!
        </h1>
        <div className="col-12 col-md-5 col-sm-6 signup-form">
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup
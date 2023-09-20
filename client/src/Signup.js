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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup
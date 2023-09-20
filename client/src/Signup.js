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
        
      </div>
    </div>
  );
}

export default Signup
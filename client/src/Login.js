import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

function Login() {
  const [loginData, setLoginData] = useState()

  const handleChange = () => {
    return
  }
  return (
    <div className='container mt-5'>
      <div className='row'>
        <h1 className='col-12 col-md-7 col-sm-6'>Login</h1>
        <div className="col-sm-6 offset-md-3 offset-sm-1">
          <form>
            <div className='mb-3'>
            <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={loginData}
                onChange={handleChange}
                required
              />
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={loginData}
                onChange={handleChange}
                required
              />
              <br></br>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <NavLink to='/signup' > Not registered yet? Register here</NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
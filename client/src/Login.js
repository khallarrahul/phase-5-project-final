import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

function Login({onLogin}) {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const userData = {name : loginData.username}
        onLogin(userData)
        history.push('/');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className='container mt-5'>
      <div className='row'>
        <h1 className='col-12 col-md-7 col-sm-6'>Login</h1>
        <div className="col-sm-6 offset-md-3 offset-sm-1">
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={loginData.username} // Set value to loginData.username
                onChange={handleChange}
                required
              />
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={loginData.password} // Set value to loginData.password
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
  );
}

export default Login;

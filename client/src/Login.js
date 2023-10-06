import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

function Login({ onLogin }) {
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleSubmit = async (values) => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const userData = { name: values.username };
        onLogin(userData);
        history.push('/');
      } else {
        setError('Username or password incorrect');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <h1 className="col-12 col-md-7 col-sm-6">Login</h1>
        <div className="col-sm-6 offset-md-3 offset-sm-1">
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-danger"
                  />
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <Field
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger"
                  />
                  {error && <div className="text-danger">{error}</div>}
                  <br />
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                  <NavLink to="/signup"> Not registered yet? Register here</NavLink>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;

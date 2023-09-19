import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css'

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <b>E-Commerce</b>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar navbar-expand-lg navbar-dark bg-dark" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/signup">
                Signup
              </NavLink>
            </li>
            <li className="nav-item dropdown d-lg-none"> {/* Added d-lg-none class */}
              <NavLink
                className="nav-link dropdown-toggle"
                to="/"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Menu
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {/* Conditionally render the Home, Login, and Signup links based on screen size */}
                {window.innerWidth <= 992 && (
                  <>
                    <li>
                      <NavLink className="dropdown-item" to="/">
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/login">
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/signup">
                        Signup
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

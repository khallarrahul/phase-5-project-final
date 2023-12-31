import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faBars } from '@fortawesome/free-solid-svg-icons';

function NavBar({ user, onLogout, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const history = useHistory();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };


  const handleSearchSubmit = (e) => {
    history.push('/');
    e.preventDefault();
    onSearch(searchTerm);
    setSearchTerm('');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <b>Amazify.com</b>
        </NavLink>
        <button
          className={`navbar-toggler`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={faBars} />
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="form-inline my-2 my-lg-0" onSubmit={handleSearchSubmit}>
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="btn btn-outline-primary" type="submit">
              Search
            </button>
          </form>
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            {user ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    Welcome {user.name}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" onClick={onLogout} to="/login">
                    Logout
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/order_history">
                    Your Orders
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/cart">
                    <FontAwesomeIcon icon={faCartShopping} />
                  </NavLink>
                </li>
              </>
            ) : (
              <>
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
              </>
            )}
            <li className="nav-item dropdown d-lg-none">
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
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

import React, {useState, useEffect} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './NavBar.css'

function NavBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const history = useHistory()

  useEffect(() => {
    // You should replace this with your actual authentication logic.
    // For example, make an API request to check the user's session on your server.
    // If the user is authenticated, setIsAuthenticated(true), otherwise setIsAuthenticated(false).
  
    // For demonstration purposes, let's assume the user is authenticated.
    setIsAuthenticated(true);
  
    // Don't forget to add setIsAuthenticated as a dependency if you use it within this block.
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/logout', {
        method: 'GET',
      });

      if (response.ok) {
        // Logout successful, set isAuthenticated to false
        setIsAuthenticated(false);
        // Redirect to the home page
        history.push('/');
      } else {
        // Handle logout error, e.g., display an error message
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
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
          {isAuthenticated ? (
            <li className="nav-item">
              <NavLink className="nav-link" to="/" onClick={handleLogout}>
                Logout
              </NavLink>
            </li>
          ) : (
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
          )}
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

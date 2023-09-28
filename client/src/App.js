import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './Login';
import Home from './Home';
import Signup from './Signup';
import NavBar from './NavBar';
import Cart from './Cart';
import Product from './Product';
import { Switch, Route } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/check_session").then((response) => {
      if (response.ok) {
        response.json().then((userData) => setUser(userData));
      }
    });
  }, []);


  const handleLogin = (userData) => {
    setUser(userData);
  };


  function handleLogout() {
    fetch("/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
        
          setUser(null);
        } else {
        
          console.error("Logout failed");
        }
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  }
  

  return (
    <div>
      <NavBar user={user} onLogout={handleLogout} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login onLogin={handleLogin} />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path='/cart'>
          <Cart />
        </Route>
        <Route path='/product/:productId'>
          <Product />
        </Route>
        <Route>
          <h1>The page you are looking for does not exist</h1>
          <h1>ERROR 404</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './Login';
import Home from './Home';
import Signup from './Signup';
import NavBar from './NavBar';
import Cart from './Cart';
import Product from './Product';
import { Switch, Route} from 'react-router-dom';
import Checkout from './Checkout';
import OrderHistory from './OrderHistory';
import UserProfile from './UserProfile';


function App() {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearch = (query) => {
    setSearchQuery(query);
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

  function wordCountLimiter(description) {
    const words = description.split(' ');
    if (words.length <= 9) {
      return description;
    } else {
      return words.slice(0, 9).join(' ') + '...';
    }
  }

  return (
    <div id="content-wrapper">
      <NavBar user={user} onLogout={handleLogout} onSearch={handleSearch} />
      <Switch>
        <Route exact path="/">
          <Home searchQuery={searchQuery} />
        </Route>
        <Route path="/login">
          <Login onLogin={handleLogin} />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path='/cart'>
          <Cart wordCountLimiter={wordCountLimiter}/>
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
        <Route path='/product/:productId'>
          <Product />
        </Route>
        <Route path='/order_history'>
          <OrderHistory wordCountLimiter={wordCountLimiter}/>
        </Route>
        <Route path='/profile'>
          <UserProfile handleLogout={handleLogout}/>
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

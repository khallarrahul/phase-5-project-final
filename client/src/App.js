import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './Login';
import Home from './Home';
import Signup from './Signup';
import NavBar from './NavBar';
import { Switch, Route } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   fetch("/check_session").then((response) => {
  //     if (response.ok) {
  //       response.json().then((user) => setUser(user));
  //     }
  //   });
  // }, []);

  // Function to set the user when logged in
  const handleLogin = (userData) => {
    setUser(userData);
  };

  // Function to log the user out
  const handleLogout = () => {
    setUser(null);
  };

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
        <Route>
          <h1>The page you are looking for does not exist</h1>
          <h1>ERROR 404</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;

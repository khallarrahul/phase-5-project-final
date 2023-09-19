import './App.css';
import Login from './Login';
import Home from './Home';
import Signup from './Signup';
import NavBar from './NavBar';
import { Switch, Route } from 'react-router-dom'

function App() {
  
  return (
    <div >
      <NavBar/>
      <Switch>
        <Route exact path="/"><Home/></Route>
        <Route path="/login"><Login/></Route>
        <Route path="/signup"><Signup/></Route>
      </Switch>
    </div>
  );
}

export default App;

import React from 'react';
import Navbar from "./components/Navbar/Navbar";
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login.js';
import Register from './components/auth/Register.js';
import Home from './components/Home.js';
import YourDelegations from './components/Delegations/YourDelegations';
import CheckRoute from './components/Delegations/CheckRoute';
import DirectionsIndex from './components/GoogleMaps/DirectionsIndex';
import AddDelegation from './components/Delegations/AddDelegation';
import history from './Utility/history';

function App() {
  return (
    <Router>
      <Switch>
    <div className="App">
      <Navbar/>
     
      <Switch>
        <Route  exact path="/" component={Home}/>
      </Switch>
      <Switch>
      <Route path="/login" component={Login}/>
      </Switch>
      <Switch>
      <Route path="/register" component={Register}/>
      </Switch>
      <Switch>
      <Route exact path="/yourdelegations" component={YourDelegations}/>
      </Switch>
      <Switch>
      <Route path="/checkroute" component={DirectionsIndex}/>
      </Switch>
      <Switch>
      <Route exact path="/yourdelegations/new" component={AddDelegation}/>
      </Switch>
    </div>
    </Switch>
    </Router>
  );
}

export default App;

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
import DelegationDetails from './components/Delegations/DelegationDetails';

function App() {
  return (
    <Router>
      <Switch>
    <div className="App">
      <Navbar/>
     
      
        <Route  exact path="/" component={Home}/>
     
      
      <Route path="/login" component={Login}/>
      
      
      <Route path="/register" component={Register}/>
    
   
      <Route exact path="/yourdelegations" component={YourDelegations}/>
    
     
      <Route path="/checkroute" component={DirectionsIndex}/>
    
      
      <Route exact path="/yourdelegations/new" component={AddDelegation}/>
      {/* <Route exact path="/carDetails/:number" component={CarDetails}/> */}
      <Route exact path="/yourdelegations/details/:id" component={DelegationDetails}/>
      {/* axios.get(/car/${props.match.params.number}) */}
      
    </div>
    </Switch>
    </Router>
  );
}

export default App;

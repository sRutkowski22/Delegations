import React, { Component } from 'react';
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
import Map from './components/GoogleMaps/Map'
import AddAccount from './components/auth/AddAccount';
import AccountantDelegations from './components/Delegations/AccountantDelegations';
import WorkerDelegationDetails from './components/Delegations/WorkerDelegationDetails';
import DraftWorkerDelegationDetails from './components/Delegations/DraftWorkerDelegationDetails';

class App extends Component{
  render(){
  return (
    <Router>
      <Switch>
    <div className="App">
      <Navbar/>
     
      
        <Route  exact path="/" component={Home}/>
     
      
      <Route path="/login" component={Login}/>
      
      
      <Route path="/register" component={Register}/>
    
   
      <Route exact path="/yourdelegations" component={YourDelegations}/>

      <Route exact path="/addaccount" component={AddAccount}/>

      <Route exact path="/alldelegations" component={AccountantDelegations}/>
    
     
      <Route path="/checkroute" component={CheckRoute}/>
      <Route exact path='/accountantdelegations/details/:id' component={DelegationDetails}/>
      
      <Route exact path="/yourdelegations/new" component={AddDelegation}/>
      {/* <Route exact path="/carDetails/:number" component={CarDetails}/> */}
      <Route exact path="/yourdelegations/details/:id" component={WorkerDelegationDetails}/>
      <Route exact path="/yourdelegations/draft/:id" component={DraftWorkerDelegationDetails}/>
      {/* axios.get(/car/${props.match.params.number}) */}
      
    </div>
    </Switch>
    </Router>
  );
}
}

export default App;

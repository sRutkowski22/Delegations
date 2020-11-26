import React from 'react';
import Navbar from "./components/Navbar/Navbar";
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login.js';

function App() {
  return (
    <Router>
      <Switch>
    <div className="App">
      <Navbar/>
      <Route path="/login" component={Login}/>
      
    </div>
    </Switch>
    </Router>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';
import Cookies from 'universal-cookie';

axios.defaults.baseURL="http://localhost:8080";

let cookies = new Cookies();
let jwt = require("jsonwebtoken");

export const currentUser = () => {
  if (cookies.get("jwt") != null) {
      return jwt.decode(cookies.get("jwt"))["sub"];
  } else {
      return "";
  }
};

export const currentRole = () => {
  if(cookies.get("jwt" ) !=null){
    return jwt.decode(cookies.get("jwt"))["auth"];
  }else{
    return "";
  }
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
 
);



import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';

axios.defaults.baseURL="http://localhost:8080";



ReactDOM.render(
    <App />,
  document.getElementById('root')
 
);



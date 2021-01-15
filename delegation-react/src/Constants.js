import React from 'react';
import Cookies from 'universal-cookie';

let cookies = new Cookies();
let jwt = require("jsonwebtoken");

export const currentUser = () => {
  if (cookies.get("jwt") != null) {
    console.log(jwt.decode(cookies.get("jwt"))["sub"]);
      return jwt.decode(cookies.get("jwt"))["sub"];
  } else {
      return "";
  }
};

export const currentRole = () => {
  if(cookies.get("jwt" ) !=null){
    return jwt.decode(cookies.get("jwt"))["auth"][0]["authority"];
  }else{
    return "";
  }
}
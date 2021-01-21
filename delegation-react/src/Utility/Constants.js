import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import PrivateRoutes from '../components/auth/PrivateRoutes';

let cookies = new Cookies();
let jwt = require("jsonwebtoken");

export const currentUser = () => {
  console.log(cookies.get("jwt"));
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


export const canAccessPage = (props, role) => {
  console.log("can access funct = " + currentUser());
  if(currentUser() !== ''){
    console.log("ya " );
    console.log("current window " + window.location.pathname );
    console.log("role " + role );
    if(currentRole() === role){
      console.log("ya2")
    }else {
      cookies.remove("jwt", {path: "/"});
      props.history.push("/login");
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'You don\'t have access',
        showConfirmButton: false,
        timer: 1500
      })  
    }
  }
  else{ 
    cookies.remove("jwt", {path: "/"});
    props.history.push("/login");
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Please sign in',
      showConfirmButton: false,
      timer: 1500
    })  
  }
}

export const extractRole = (pathname) => {
  console.log("privateroutepath " + PrivateRoutes[0]['path']);
    for(const property in PrivateRoutes){
     
        console.log("privaterouteprop " + PrivateRoutes[property]['path']);
       if(  PrivateRoutes[property]['path'] === pathname){
         console.log(PrivateRoutes[property]['role'])
        
         return PrivateRoutes[property]['role'];
       }
      }
  }

  export const jwtHeader = () =>{
    if(cookies.get("jwt") !== 0)
    return {"headers": {"Authorization": "Bearer " +cookies.get("jwt")}};
    else return "";
  }
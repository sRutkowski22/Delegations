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

  const key = 'AIzaSyAp53Lvrb6z20zPceNKYVztUXneMQCGQKc'; 
  export const G_API_URL = `https://maps.googleapis.com/maps/api/js?key=${key}&&v=3.exp&libraries=geometry,drawing,places`;

const convertTolatLng = (latLng, title) => {
  return {
    latLng,
    title
  };
};

export const locationsList = {
  Mumbai: convertTolatLng("19.022002, 72.867721", "Mumbai"),
  Pune: convertTolatLng("18.469086, 73.907005", "Pune"),
  Goa: convertTolatLng("15.233341, 73.909253", "Goa"),
  Ratnagiri: convertTolatLng("16.964074, 73.326397", "Ratnagiri"),
  Nagpur: convertTolatLng("21.132174, 79.089675", "Nagpur"),
  Nashik: convertTolatLng("19.978465, 73.804211", "Nashik"),
  Indore: convertTolatLng("22.755782, 75.917579", "Indore"),
  Gwalior: convertTolatLng("26.171713, 78.185675", "Gwalior"),
  Madurai: convertTolatLng("9.955630, 78.123622", "Madurai"),
  Coimbatore: convertTolatLng("11.081561, 76.976503", "Coimbatore"),
  Chennai: convertTolatLng("13.051412, 80.262966", "Chennai"),
  Tirupati: convertTolatLng("13.638829, 79.414973", "Tirupati"),
  Kochi: convertTolatLng("9.912442, 76.264116", "Kochi"),
  Thiruvalla: convertTolatLng("9.383452,	76.574059", "Thiruvalla"),
  Udaipur: convertTolatLng("24.580824, 73.719209", "Udaipur"),
  Jodhpur: convertTolatLng("26.347757, 73.000038", "Jodhpur"),
  Jaisalmer: convertTolatLng("27.068332, 71.007781", "Jaisalmer"),
  Jaipur: convertTolatLng("26.906955, 75.799071", "Jaipur"),
  Kota: convertTolatLng("25.198216, 75.877209", "Kota"),
  Bikaner: convertTolatLng("28.021093, 73.281782", "Bikaner"),
  NewDelhi: convertTolatLng("28.507686, 77.206072", "NewDelhi"),
  Allahabad: convertTolatLng("25.44894, 81.83329", "Allahabad"),
  Amritsar: convertTolatLng("31.63661, 74.87476", "Amritsar"),
  Chandigarh: convertTolatLng("30.73629, 76.7884", "Chandigarh"),
  Ludhiana: convertTolatLng("30.919145, 75.846575", "Ludhiana"),
  Jalandhar: convertTolatLng("31.319573, 75.582333", "Jalandhar"),
  Kanpur: convertTolatLng("26.432935, 80.358135", "Kanpur"),
  Bareilly: convertTolatLng("28.373686, 79.444619", "Bareilly"),
  Lucknow: convertTolatLng("26.836715, 80.955835", "Lucknow"),
  Agra: convertTolatLng("27.165312, 77.986309", "Agra"),
  Islamabad: convertTolatLng("33.759944, 73.045721", "Islamabad"),
  RawalPindi: convertTolatLng("33.526811, 72.999296", "RawalPindi"),
  Lahore: convertTolatLng("31.621512, 74.313370", "Lahore"),
  Multan: convertTolatLng("30.282118, 71.513232", "Multan"),
  Dhaka: convertTolatLng("23.747004, 90.417368", "Dhaka"),
  Chittagong: convertTolatLng("22.377184, 91.784677", "Chittagong"),
  Kohima: convertTolatLng("25.675901, 94.103753", "Kohima"),
  Imphal: convertTolatLng("24.797547, 93.942866", "Imphal"),
  Guwahati: convertTolatLng("26.133795, 91.720651", "Guwahati"),
  Shillong: convertTolatLng("25.579953, 91.895050", "Shillong"),
  Kolkata: convertTolatLng("22.581033, 88.353381", "Kolkata"),
  Hydrabad: convertTolatLng("17.444931, 78.466652", "Hydrabad"),
  Jamshedpur: convertTolatLng("22.794818, 86.200032", "Jamshedpur"),
  Ranchi: convertTolatLng("23.342498, 85.318250", "Ranchi"),
  Cuttack: convertTolatLng("20.455554, 85.888064", "Cuttack"),
  Bhubaneswar: convertTolatLng("20.298782, 85.817625", "Bhubaneswar"),
  Raipur: convertTolatLng("21.257255, 81.642624", "Raipur"),
  Bilaspur: convertTolatLng("22.015325, 82.131163", "Bilaspur"),
  Visakhapatnam: convertTolatLng("17.739811, 83.234842", "Visakhapatnam"),
  Srikakulam: convertTolatLng("18.379253, 83.891126", "Srikakulam"),
  Vijayawada: convertTolatLng("16.497527, 80.652215", "Bikaner"),
  Kanchipuram: convertTolatLng("12.859154, 79.701510", "Kanchipuram"),
  Dambulla: convertTolatLng("7.907274, 80.655548", "Dambulla"),
  Colombo: convertTolatLng("6.910271, 79.855462", "Colombo"),
  Galle: convertTolatLng("6.049105, 80.224266", "Galle"),
  Kandy: convertTolatLng("7.290812, 80.631216", "Kandy"),
  Porbandar: convertTolatLng("21.637215, 69.628066", "Porbandar"),
  Srinagar: convertTolatLng("34.076263, 74.800088", "Srinagar")
};
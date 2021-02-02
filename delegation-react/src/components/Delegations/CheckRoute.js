import React, { Component } from 'react';
import DirectionsIndex from '../GoogleMaps/DirectionsIndex';
import Map from '../GoogleMaps/Map'
import './CheckRoute.css';

class CheckRoute extends Component{

    render(){
        return(
            <div className="map-size">
          <div>Check route</div>
          <div>
            {/* <DirectionsIndex/> */}
            
          </div>
          <div>
          <Map
     google={this.props.google}
     center={{lat: 51.73713266085641, lng: 19.677774633837448}}
     height='300px'
     zoom={15}
    />
          </div>
          </div>
        )
    };

}

export default CheckRoute;
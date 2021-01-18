import React, { Component } from 'react';
import DirectionsIndex from '../GoogleMaps/DirectionsIndex';
import './CheckRoute.css';

class CheckRoute extends Component{

    render(){
        return(
            <div className="map-size">
          <div>Check route</div>
          <div>
            <DirectionsIndex/>
          </div>
          </div>
        )
    };

}

export default CheckRoute;
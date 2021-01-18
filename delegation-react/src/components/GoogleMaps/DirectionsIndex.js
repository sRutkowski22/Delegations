import React, { Component } from "react";
import { compose, withProps } from "recompose";
import DirectionRenderComponent from "./DirectionRenderComponent";
import { G_API_URL } from "../../Utility/MapConstants";
import DummyLocations from "../../Utility/dummyLocations";
import './DirectionsIndex.css';
const { withScriptjs, withGoogleMap, GoogleMap } = require("react-google-maps");
class Directions extends Component {
  state = {
    defaultZoom: 7,
    map: null,
    center: {
      lat: 51.73713266085641,
      lng: 19.677774633837448
    }
     
  };
  render() {
    return (
      <div className="map-size">
      <GoogleMap
        defaultZoom={this.state.defaultZoom}
        center={this.state.center}
        defaultCenter={new window.google.maps.LatLng(23.21632, 72.641219)}
      >
        {DummyLocations.map((elem, index) => {
          return (
            <DirectionRenderComponent
              key={index}
              index={index + 1}
              strokeColor={elem.strokeColor}
              from={elem.from}
              to={elem.to}
            />
          );
        })}
      </GoogleMap>
      </div>
    );
  }
}

export default compose(
  withProps({
    googleMapURL: G_API_URL,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(Directions);
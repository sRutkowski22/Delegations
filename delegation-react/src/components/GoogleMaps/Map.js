import React from 'react'
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker, DirectionsRenderer } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
import { Form, Button } from 'react-bootstrap';
import './Map.css';
import axios from 'axios';
import swal from "sweetalert";
import Swal from 'sweetalert2';
const key = 'AIzaSyA4f7KaqFbfYOdrekALmpdwki1rdsFw2Ok'; 
Geocode.setApiKey(key);
Geocode.enableDebug();
class Map extends React.Component{
constructor( props ){
  super( props );
  this.state = {
   address: '',
   originPlaceId: '',
   city: '',
   area: '',
   state: '',
   destinationAddress: '',
   destinationPlaceId: '',
   mapPosition: {
    lat: this.props.center.lat,
    lng: this.props.center.lng
   },
   originMarkerPosition: {
    lat: this.props.center.lat,
    lng: this.props.center.lng
},
  destinationMarkerPosition: {
    lat: '',
    lng: ''

  }
  }
 }
/**
  * Get the current address from the default map position and set those values in the state
  */
 componentDidMount() {
  Geocode.fromLatLng( this.state.mapPosition.lat , this.state.mapPosition.lng ).then(
   response => {
     console.log("res", response);
    const address = response.results[0].formatted_address,
     addressArray =  response.results[0].address_components,
     city = this.getCity( addressArray ),
     area = this.getArea( addressArray ),
     state = this.getState( addressArray );
  
    console.log( 'city', city, area, state );
  
    this.setState( {
     address: ( address ) ? address : '',
     area: ( area ) ? area : '',
     city: ( city ) ? city : '',
     state: ( state ) ? state : '',
    } )
   },
   error => {
    console.error(error);
   }
  );
 };
/**
  * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
  *
  * @param nextProps
  * @param nextState
  * @return {boolean}
  */
 
 shouldComponentUpdate( nextProps, nextState ){
  if (
   this.state.originMarkerPosition.lat !== this.props.center.lat ||
   this.state.destinationMarkerPosition.lat !== this.props.center.lat ||
   this.state.address !== nextState.address ||
   this.state.city !== nextState.city ||
   this.state.area !== nextState.area ||
   this.state.state !== nextState.state
  ) {
   return true
  } else if ( this.props.center.lat === nextProps.center.lat ){
   return false
  }
 }
/**
  * Get the city and set the city input value to the one selected
  *
  * @param addressArray
  * @return {string}
  */
 getCity = ( addressArray ) => {
  let city = '';
  for( let i = 0; i < addressArray.length; i++ ) {
   if ( addressArray[ i ].types[0] && 'administrative_area_level_2' === addressArray[ i ].types[0] ) {
    city = addressArray[ i ].long_name;
    return city;
   }
  }
 };
/**
  * Get the area and set the area input value to the one selected
  *
  * @param addressArray
  * @return {string}
  */
 getArea = ( addressArray ) => {
  let area = '';
  for( let i = 0; i < addressArray.length; i++ ) {
   if ( addressArray[ i ].types[0]  ) {
    for ( let j = 0; j < addressArray[ i ].types.length; j++ ) {
     if ( 'sublocality_level_1' === addressArray[ i ].types[j] || 'locality' === addressArray[ i ].types[j] ) {
      area = addressArray[ i ].long_name;
      return area;
     }
    }
   }
  }
 };
/**
  * Get the address and set the address input value to the one selected
  *
  * @param addressArray
  * @return {string}
  */
 getState = ( addressArray ) => {
  let state = '';
  for( let i = 0; i < addressArray.length; i++ ) {
   for( let i = 0; i < addressArray.length; i++ ) {
    if ( addressArray[ i ].types[0] && 'administrative_area_level_1' === addressArray[ i ].types[0] ) {
     state = addressArray[ i ].long_name; 
     return state;
    }
   }
  }
 };
/**
  * And function for city,state and address input
  * @param event
  */
 onChange = ( event ) => {
  this.setState({ [event.target.name]: event.target.value });
 };
/**
  * This Event triggers when the marker window is closed
  *
  * @param event
  */
 onInfoWindowClose = ( event ) => {
};

/**
  * When the marker is dragged you get the lat and long using the functions available from event object.
  * Use geocode to get the address, city, area and state from the lat and lng positions.
  * And then set those values in the state.
  *
  * @param event
  */
 onMarkerDragEnd = ( event ) => {
  console.log( 'event', event );
  let newLat = event.latLng.lat(),
   newLng = event.latLng.lng(),
   addressArray = [];
Geocode.fromLatLng( newLat , newLng ).then(
   response => {
    const address = response.results[0].formatted_address,
     addressArray =  response.results[0].address_components,
     city = this.getCity( addressArray ),
     area = this.getArea( addressArray ),
     state = this.getState( addressArray );
this.setState( {
     address: ( address ) ? address : '',
     area: ( area ) ? area : '',
     city: ( city ) ? city : '',
     state: ( state ) ? state : ''
    } )
   },
   error => {
    console.error(error);
   }
  );
 };

  /**
  * When the user types an address in the search box
  * @param place
  */
 onOriginSelected = ( place ) => {
   console.log('origin', place)
  const address = place.formatted_address;
  const tempPlaceId = place.place_id,
     addressArray =  place.address_components,
     city = this.getCity( addressArray ),
     area = this.getArea( addressArray ),
     state = this.getState( addressArray ),
     latValue = place.geometry.location.lat(),
     lngValue = place.geometry.location.lng();
     console.log("address aray " ,addressArray)
     console.log("origin id ", tempPlaceId)
  // Set these values in the state.
    this.setState({
     address: ( address ) ? address : '',
     area: ( area ) ? area : '',
     city: ( city ) ? city : '',
     state: ( state ) ? state : '',
     originMarkerPosition: {
      lat: latValue,
      lng: lngValue
     },
     mapPosition: {
      lat: latValue,
      lng: lngValue
     },
     originPlaceId: tempPlaceId
    })
   };

   onDestinationSelected = (destination) =>{
     console.log('destination', destination)
     const address = destination.formatted_address;
     const tempPlaceId = destination.place_id,
     addressArray =  destination.address_components,
     city = this.getCity( addressArray ),
     area = this.getArea( addressArray ),
     state = this.getState( addressArray ),
     latValue = destination.geometry.location.lat(),
     lngValue = destination.geometry.location.lng()
     console.log("destination id ", tempPlaceId)
     console.log('lat lang dest ' + destination.geometry.location.lng() + destination.geometry.location.lat())
     this.setState({
      destinationAddress: ( address ) ? address : '',
      area: ( area ) ? area : '',
      city: ( city ) ? city : '',
      state: ( state ) ? state : '',
      destinationMarkerPosition:{
        lat: latValue,
        lng: lngValue
      },
      mapPosition: {
       lat: latValue,
       lng: lngValue
      },
      destinationPlaceId: tempPlaceId
     })
   }

   getDistance = (originlat, originlng, destlat, destlng) => {
  //   axios.get("https://maps.googleapis.com/maps/api/directions/json?origin=place_id:ChIJDezru8jSG0cRP9sLDNs88LQ&destination=place_id:EiNCZWRvxYRza2EsIDk1LTAyMCBKdXN0eW7Ds3csIFBvbGFuZCIuKiwKFAoSCddqPK7I0htHEfQmCK8PeltbEhQKEgmVE4lVzdIbRxEH4LhUm8qp6A&key=AIzaSyA4f7KaqFbfYOdrekALmpdwki1rdsFw2Ok"
  //   ,{
  //     mode: 'no-cors'
  //   } )
  //   .then(response => {
  //       console.log(response.message,response);
  //     console.log('res', response.data)
  //       Swal.fire(
  //           'Login completed!',
  //           '',
  //           'success'
  //       )
    
  //  }).catch(error => {
  //   console.log("blad", error.data)
  //   swal({
  //   title: 'blad',
  //   icon: "error",
  //   closeOnClickOutside:true
  //   });
  //  });
  fetch('http://maps.googleapis.com/maps/api/directions/json?origin=place_id:ChIJDezru8jSG0cRP9sLDNs88LQ&destination=place_id:EiNCZWRvxYRza2EsIDk1LTAyMCBKdXN0eW7Ds3csIFBvbGFuZCIuKiwKFAoSCddqPK7I0htHEfQmCK8PeltbEhQKEgmVE4lVzdIbRxEH4LhUm8qp6A&key=AIzaSyA4f7KaqFbfYOdrekALmpdwki1rdsFw2Ok'
  )
  .then(response => response.json())
  .then(data => console.log(data))
};
  

render(){
const AsyncMap = withScriptjs(
   withGoogleMap(
    props => (
     <GoogleMap google={this.props.google}
      defaultZoom={this.props.zoom}
      defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
     >
        <Marker google={this.props.google}
       name={'Origin pin'}
          draggable={true}
          onDragEnd={ this.onMarkerDragEnd }
             position={{ lat: this.state.originMarkerPosition.lat, lng: this.state.originMarkerPosition.lng }}
      />
      <Marker />
      <Marker google={this.props.google}
       name={'Destination pin'}
          draggable={true}
          onDragEnd={ this.onMarkerDragEnd }
             position={{ lat: this.state.destinationMarkerPosition.lat, lng: this.state.destinationMarkerPosition.lng }}
      />
      <Marker />
      {/* InfoWindow on top of marker */}
      <InfoWindow
       onClose={this.onInfoWindowClose}
       position={{ lat: ( this.state.originMarkerPosition.lat + 0.0018 ), lng: this.state.originMarkerPosition.lng }}
      >
       <div>
        <span style={{ padding: 0, margin: 0 }}>{ this.state.address }</span>
        </div>
      </InfoWindow>
      {/* For Auto complete Search Box */}
      <Form.Label>Origin</Form.Label>
      <Autocomplete
       style={{
        width: '100%',
        height: '30px',
        paddingLeft: '16px',
        marginBottom: '15px'
       }}
       onPlaceSelected={ this.onOriginSelected }
       types={['address']}
      />
      <Form.Label>Destination</Form.Label>
      <Autocomplete
       style={{
        width: '100%',
        height: '30px',
        paddingLeft: '16px',
        marginBottom: '4px'
       }}
       onPlaceSelected={ this.onDestinationSelected }
       types={['address']}
      />
      <DirectionsRenderer
            
              from={this.state.originPlaceId}
              to={this.state.destinationPlaceId}
            />
</GoogleMap>
)
   )
  );
let map;
  if( this.props.center.lat !== undefined ) {
   map = <div>
   
     <div>
     <Form.Row>
      
        <div>
        <label>Origin</label>
        </div>
        <div className="destination-tag">
        <label className="destination-tag">Destination</label>
        </div>
       
        </Form.Row>
        <Form.Row>
        <div className="form-group-left">
       <label  htmlFor="">Address</label>
       <input   type="text" name="city" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.address }/>
       </div>
      <div>
       <label className="form-group-left" htmlFor="">Address</label>
       <input type="text" name="city" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.destinationAddress }/>
      </div>
      </Form.Row>
      <div className="button">
      <Button onClick={ this.getDistance}>Check distance</Button>
      </div>
      <div className="form-group">
       <label htmlFor="">Area</label>
       <input type="text" name="area" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.area }/>
      </div>
      <div className="form-group">
       <label htmlFor="">State</label>
       <input type="text" name="state" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.state }/>
      </div>
      <div className="form-group">
       <label htmlFor="">Address</label>
       <input type="text" name="address" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.address }/>
      </div>
     </div>
     {/*Marker*/}
    
     <AsyncMap
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA4f7KaqFbfYOdrekALmpdwki1rdsFw2Ok&libraries=places"
      loadingElement={
       <div style={{ height: `100%` }} />
      }
      containerElement={
       <div style={{ height: this.props.height }} />
      }
      mapElement={
       <div style={{ height: `100%` }} />
      }
     />
    </div>
} else {
   map = <div style={{height: this.props.height}} />
  }
  return( map )
 }
}
export default Map
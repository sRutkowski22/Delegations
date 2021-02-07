import axios from 'axios';
import React, { Component } from 'react';
import {Button, Form, FormGroup, FormControl, FormLabel, InputGroup} from 'react-bootstrap';
import { canAccessPage, extractRole, jwtHeader } from '../../Utility/Constants';
import './DelegationDetails.css'

class DelegationDetails extends Component{

    constructor(props){
        super(props);
        // canAccessPage(this.props,extractRole(window.location.pathname));
        this.state = {
            delegation: {}
        }
    }

    componentDidMount () {
        console.log("previous id " + this.props.match.params.id)
        let delNumber = this.props.match.params.id;
        console.log("previous id " + delNumber)
        axios.get("/delegations/worker/getdelegationbynumber/" + delNumber, jwtHeader())
        .then(response => {
            const tempdel = response.data;
            this.setState( {delegation:tempdel})

            console.log(response.data)
        }).catch(error => {
            console.log(error.message);
        })
    }

    
    renderForeignDelegation = () => {
     
            return (
                <React.Fragment>
                    <FormGroup>
                        <FormLabel> Crossing foreign border</FormLabel>
                        {/* <FormControl id="crossingForeignBorder" value={this.state.delegation["crossingForeignBorder"]} onChange={(event) => this.handleChangeProperty(event, "crossingForeignBorder")} isInvalid={!this.state.valid["crossingForeignBorder"]} type="datetime-local"/> */}
                        <FormControl.Feedback type="invalid">Crossing Foreign border date must be later than start date and earlier than crossing home border date.</FormControl.Feedback>
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Crossing home border</FormLabel>
                        {/* <FormControl id="crossingHomeBorder" value={this.state.delegation["crossingHomeBorder"]} onChange={(event) => this.handleChangeProperty(event, "crossingHomeBorder")} isInvalid={!this.state.valid["crossingHomeBorder"]} type="datetime-local"/> */}
                        <FormControl.Feedback type="invalid">Crossing home border must be later than crossing foreign border and earlier than end date.</FormControl.Feedback>
                    </FormGroup>
                    
                    <FormGroup   >
                        <InputGroup >
                        <Form.Label className="input-destination-group" id="inputGroupAppend">Foreign Allowance</Form.Label>
                        {/* <Form.Control className="foreign-allowance"
                        type="number"
                         placeholder="Foreign Allowance"
                        aria-describedby="inputGroupAppend"
                          label="Foreign Allowance"
                         id="foreignAllowance"
                         value={this.state.delegation['foreignAllowance']}
                          onChange={(event) => this.handleChangeProperty(event, "foreignAllowance")}
                          isInvalid={!this.state.valid["foreignAllowance"]}
                          defaultValue="60"
                      />  */}
                      <Form.Control.Feedback type="invalid">Foreign allowance value must be higher than domestic allowance</Form.Control.Feedback>
                        <InputGroup.Append>
                          <InputGroup.Text id="inputGroupAppend">ZŁ</InputGroup.Text>
                       </InputGroup.Append>
                       <Form.Control.Feedback type="invalid" tooltip>
                  
                       </Form.Control.Feedback>
                      </InputGroup>
                     </FormGroup>

                    <div className="checkbox-group">
                        <FormGroup  className="checkbox-form">
                        <Form.Check id="guaranteedForeignBreakfast" type="checkbox" checked={this.state.guaranteedForeignBreakfast} label="Breakfast guarantee" value={this.state.guaranteedForeignBreakfast} onChange={(event) => this.handleChangeProperty(event, "guaranteedForeignBreakfast")} ></Form.Check> 
                    </FormGroup >
                    <FormGroup className="checkbox-form">
                        <Form.Check id="guaranteedForeignDinner" type="checkbox" checked={this.state.guaranteedForeignDinner} label="Dinner guarantee" value={this.state.guaranteedForeignDinner} onChange={(event) => this.handleChangeProperty(event, "guaranteedForeignDinner")} ></Form.Check>
                    </FormGroup>
                    <FormGroup className="checkbox-form">
                        <Form.Check id="guaranteedForeignSupper"  type="checkbox" checked={this.state.guaranteedForeignSupper} label="Supper guarantee" value={this.state.guaranteedForeignSupper} onChange={(event) => this.handleChangeProperty(event, "guaranteedForeignSupper")} ></Form.Check>
                    </FormGroup>
                    
                    </div>
                </React.Fragment>
            );
        
    };

    renderHomeDelegation = () => {
        return (
            <React.Fragment>

            <Form.Row className="destination">
            <FormGroup  className="destination-group" >
            <InputGroup >
            <Form.Label className="input-destination-group" id="inputGroupAppend">Destination</Form.Label>
                <Form.Control className="destination-text"
                   
                  placeholder="Destination"
                  aria-describedby="inputGroupAppend"
                  label="Destination"
                  id="destination"
                  value={this.state.delegation['destination']}
                  onChange={(event) => this.handleChangeProperty(event, "destination")}
                 
                /> 
                
                <Form.Control.Feedback type="invalid" tooltip>
                  
                </Form.Control.Feedback>
              </InputGroup>
            </FormGroup> 
            <FormGroup  className="advance-payment-group" >
            <InputGroup >
                
                <Form.Control
                  type="number"
                  placeholder="Advance payment"
                  aria-describedby="inputGroupAppend"
                  label="Advance payment"
                  id="advancePayment"
                  value={this.state.delegation['advancePayment']}
                  onChange={(event) => this.handleChangeProperty(event, "advancePayment")}
                 
                /> 
                <InputGroup.Append>
                  <InputGroup.Text id="inputGroupAppend">ZŁ</InputGroup.Text>
                </InputGroup.Append>
                <Form.Control.Feedback type="invalid" tooltip>
                  
                </Form.Control.Feedback>
              </InputGroup>
            </FormGroup>
            
            </Form.Row>


                <FormGroup className="date-form">
                    <FormLabel>Delegation's start date</FormLabel>
                    {/* <FormControl id="startDate" value={this.state.delegation["startDate"]} onChange={(event) => this.handleChangeProperty(event, "startDate")} isInvalid={!this.state.valid["startDate"]} type="datetime-local"/> */}
                    <FormControl.Feedback type="invalid">Start date must be before end date.</FormControl.Feedback>
                </FormGroup>

                <FormGroup>
                <FormLabel>Delegation's end date</FormLabel>
                    {/* <FormControl id="endDate" value={this.state.delegation["endDate"]} onChange={(event) => this.handleChangeProperty(event, "endDate")} isInvalid={!this.state.valid["endDate"]} type="datetime-local" /> */}
                    <FormControl.Feedback type="invalid">End date must be after start date.</FormControl.Feedback>
                </FormGroup>
                <div className="checkbox-group">
                    <Form.Row>
                <FormGroup  className="checkbox-form">
                    <Form.Check id="guaranteedDomesticBreakfast" type="checkbox" checked={this.state.guaranteedDomesticBreakfast} label="Breakfast guarantee" value={this.state.guaranteedDomesticBreakfast} onChange={(event) => this.handleChangeProperty(event, "guaranteedDomesticBreakfast")} ></Form.Check> 
                </FormGroup >
                <FormGroup className="checkbox-form">
                    <Form.Check id="guaranteedDomesticDinner" type="checkbox" checked={this.state.guaranteedDomesticDinner} label="Dinner guarantee" value={this.state.guaranteedDomesticDinner} onChange={(event) => this.handleChangeProperty(event, "guaranteedDomesticDinner")} ></Form.Check>
                </FormGroup>
                <FormGroup className="checkbox-form">
                    <Form.Check id="guaranteedDomesticSupper"  type="checkbox" checked={this.state.guaranteedDomesticSupper} label="Supper guarantee" value={this.state.guaranteedDomesticSupper} onChange={(event) => this.handleChangeProperty(event, "guaranteedDomesticSupper")} ></Form.Check>
                </FormGroup>
                </Form.Row>
                <Form.Row>
                <FormGroup className="checkbox-form">
                    <Form.Check  id="guaranteedAccommodation"  type="checkbox" checked={this.state.guaranteedAccommodation} label="Accomodation guarantee" value={this.state.guaranteedAccommodation} onChange={(event) => this.handleChangeProperty(event, "guaranteedAccommodation")} ></Form.Check>
                </FormGroup>
                <FormGroup className="checkbox-form">
                    <Form.Check  id="homeTransportCharge"  type="checkbox"  checked={this.state.homeTransportCharge} label="Transport charge" value={this.state.homeTransportCharge} onChange={(event) => this.handleChangeProperty(event, "homeTransportCharge")} ></Form.Check>
                </FormGroup>
                </Form.Row>

                
                </div>
                
            </React.Fragment>
        );
    }

    renderPrivateCar = () => {
        if(this.state.privateCar)
        return(
        <React.Fragment>
            <Form.Row>
            <FormGroup className="form-private-car">
            <InputGroup>
                
                <Form.Control
                  type="number"
                  placeholder="Distance"
                  aria-describedby="inputGroupPrepend"
                  id="distance"
                  value={this.state.delegation['distance']}
                  onChange={(event) => this.handleChangeProperty(event, "distance")}
                  isInvalid={!this.state.valid["distance"]}
                /> 
                <InputGroup.Append>
                  <InputGroup.Text id="inputGroupPrepend">KM</InputGroup.Text>
                </InputGroup.Append>
                <Form.Control.Feedback type="invalid" tooltip>
                  It must be a number
                </Form.Control.Feedback>
              </InputGroup>
            </FormGroup>
            <FormGroup className="checkbox-form-engine">
                    <Form.Check className="checkbox-form-acc" id="greaterThan900cm3"  type="checkbox"  checked={this.state.greaterThan900cm3} label="Engine at least 900cm3" value={this.state.greaterThan900cm3} onChange={(event) => this.handleChangeProperty(event, "greaterThan900cm3")}  ></Form.Check>
                </FormGroup>
            </Form.Row>
        </React.Fragment>
        );
    }

    renderForm = () => {
        return(
            <Form className="add-del-form" onSubmit={this.handleSubmit}>
                <h1 className="header1">Delegation Details</h1>
                {this.renderHomeDelegation()}
                <div className="header1"></div>
                <Form.Switch id="foreignDelegationSwitch" label="Foreign Delegation" checked={this.state.foreignDelegation} onChange={this.enableForeignDelegation} style={{"margin-bottom": "0.75em"}}/> 
                    {this.renderForeignDelegation()} 
                <div className="header1"></div>
                <Form.Switch id="privateCarSwitch" label="Private car" checked={this.state.privateCar} onChange={this.enablePrivateCar} style={{"margin-bottom": "0.75em"}}/> 
                    {this.renderPrivateCar()} 
                <Button type="submit">Submit</Button>
            </Form>
        );
    }
    render(){

        
        return(
            <div>
                
                {this.renderForm()};

            </div>
            
        );
    }

}

export default DelegationDetails;
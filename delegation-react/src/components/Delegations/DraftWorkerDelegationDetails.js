import React, { Component } from 'react';
import {Button, Form, FormGroup, FormControl, FormLabel, InputGroup} from 'react-bootstrap';
import moment from 'moment';
import Moment from 'moment';
import { canAccessPage, extractRole, jwtHeader } from '../../Utility/Constants';
import './AddDelegation.css'
import axios from 'axios';
import ErrorCodes from '../auth/HTTPCodes';
import Swal from 'sweetalert2';
import {currentUser} from "../../Utility/Constants.js";
import HTTPCodes from '../auth/HTTPCodes';
import DelegationStatuses from '../../Utility/DelegationStatuses';

class DraftWorkerDelegationDetails extends Component{

    constructor(props){
        super(props);
        // canAccessPage(this.props,extractRole(window.location.pathname));
        this.state = {
            delegation: {
              
            },
            valid: {"crossingForeignBorder": true, "crossingHomeBorder": true, "startDate": true, "endDate": true,
                    "distance": true, "foreignAllowance": true},
            foreignDelegation: false,
            guaranteedDomesticBreakfast: false,
            guaranteedDomesticDinner: false,
            guaranteedDomesticSupper: false,
            guaranteedForeignBreakfast: false,
            guaranteedForeignDinner: false,
            guaranteedForeignSupper: false,
            guaranteedAccomodation: false,
            homeTransportCharge: false,
            privateCar: false,
            greaterThan900cm3: false

            

        }
    }

    componentDidMount = () =>{
        let delNumber = this.props.match.params.id;
        console.log("previous id " + delNumber)
        
        axios.get("/delegations/worker/getdelegationbynumber/" + delNumber, jwtHeader())
        .then(response => {
            const tempdel = response.data;
            this.setState( {delegation:tempdel})
            console.log(this.state.delegation.crossingForeignBorder)
            this.setState({ 
                greaterThan900cm3: tempdel.greaterThan900cm3,
                guaranteedDomesticBreakfast: tempdel.guaranteedDomesticBreakfast,
                guaranteedDomesticDinner: tempdel.guaranteedDomesticDinner,
                guaranteedDomesticSupper: tempdel.guaranteedDomesticSupper,
                guaranteedForeignBreakfast: tempdel.guaranteedForeignBreakfast,
                guaranteedForeignDinner: tempdel.guaranteedForeignDinner,
                guaranteedForeignSupper: tempdel.guaranteedForeignSupper,
                guaranteedAccomodation: tempdel.guaranteedAccommodation,
                homeTransportCharge: tempdel.homeTransportCharge
            })
            if(tempdel.distance !== 0)
            this.setState({privateCar: true})
            if(tempdel.crossingForeignBorder !== null)
            this.setState({foreignDelegation: true})

            console.log(response.data)
        
        }).catch(error => {
            console.log(error.message);
        })
    
    }

    checkValidation = () => {
        let validated = true;
        let tempValid = {...this.state.valid};
  
        for (let key in tempValid) {
            if (tempValid.hasOwnProperty(key) && tempValid[key] === false) {
                this.validateProperty(key);
                validated = false;
                break;
            }
        }
        return validated;
    };

    handleChangeProperty = (event, property) => {
        let tempDel = {...this.state.delegation};
        this.validateProperty(property);
        console.log(event.target.value)
        
        switch(property){
           case "guaranteedDomesticBreakfast":      
               this.state.guaranteedDomesticBreakfast = !this.state.guaranteedDomesticBreakfast;
               tempDel[property] = this.state.guaranteedDomesticBreakfast;
                break;
            case "guaranteedDomesticDinner": 
            this.state.guaranteedDomesticDinner = !this.state.guaranteedDomesticDinner;
               tempDel[property] = this.state.guaranteedDomesticDinner;
                break;
            case "guaranteedDomesticSupper":
                this.state.guaranteedDomesticSupper = !this.state.guaranteedDomesticSupper;
               tempDel[property] = this.state.guaranteedDomesticSupper;
                break;
            case "guaranteedForeignBreakfast":
                this.state.guaranteedForeignBreakfast = !this.state.guaranteedForeignBreakfast;
               tempDel[property] = this.state.guaranteedForeignBreakfast;
                break;
            case "guaranteedForeignDinner":
                this.state.guaranteedForeignDinner = !this.state.guaranteedForeignDinner;
               tempDel[property] = this.state.guaranteedForeignDinner;
                break;
            case "guaranteedForeignSupper":
                this.state.guaranteedForeignSupper = !this.state.guaranteedForeignSupper;
               tempDel[property] = this.state.guaranteedForeignSupper;
                break;
            case "guaranteedAccommodation":
                this.state.guaranteedAccomodation = !this.state.guaranteedAccomodation;
               tempDel[property] = this.state.guaranteedAccomodation;
                break;
            case "homeTransportCharge":
                this.state.homeTransportCharge = !this.state.homeTransportCharge;
               tempDel[property] = this.state.homeTransportCharge;
                break;
            case "greaterThan900cm3":
                this.state.greaterThan900cm3 = !this.state.greaterThan900cm3;
               tempDel[property] = this.state.greaterThan900cm3;
                break;    
            default:
                tempDel[property] = event.target.value;
                break;
        }
        this.state.delegation = tempDel;
        console.log(this.state.delegation)
    };

    validateProperty = (property) => {
        let tempValid = {...this.state.valid};
        switch (property) {
            case "startDate":
                if(this.state.foreignDelegation){
                    tempValid["startDate"] = moment(document.getElementById("startDate").value).isBefore(moment(document.getElementById("crossingForeignBorder").value))               
                }else
                tempValid["startDate"] = moment(document.getElementById("startDate").value).isBefore(moment(document.getElementById("endDate").value))           
                if(tempValid["startDate"] === true)
                tempValid["endDate"] = true;
                break;
            case "endDate":
                if(this.state.foreignDelegation){
                    tempValid["endDate"] = moment(document.getElementById("endDate").value).isAfter(moment(document.getElementById("crossingHomeBorder").value))               
                }else
                tempValid["endDate"] = moment(document.getElementById("endDate").value).isAfter(moment(document.getElementById("startDate").value));
                if(tempValid["endDate"] === true)
                tempValid["startDate"] = true;
                break;
            case "crossingForeignBorder":
                tempValid["crossingForeignBorder"] = moment(document.getElementById("crossingForeignBorder").value).isAfter(moment(document.getElementById("startDate").value)) && moment(document.getElementById("crossingForeignBorder").value).isBefore(moment(document.getElementById("crossingHomeBorder").value));
                if(tempValid["crossingForeignBorder"]){
                    tempValid["crossingHomeBorder"] = true;
                    tempValid["startDate"] = true;
                }
                break;
            case "crossingHomeBorder":
                tempValid["crossingHomeBorder"] = moment(document.getElementById("crossingHomeBorder").value).isAfter(moment(document.getElementById("crossingForeignBorder").value)) && moment(document.getElementById("crossingHomeBorder").value).isBefore(moment(document.getElementById("endDate").value));
                if(tempValid["crossingHomeBorder"] === true){
                tempValid["crossingForeignBorder"] = true;
                tempValid["endDate"] = true;
                }
                break;
            case "foreignAllowance":
                tempValid["foreignAllowance"] = document.getElementById("foreignAllowance").value>30;
                break;
            default:
                break;
        }
        this.setState({valid: tempValid});
    };

    enableForeignDelegation = () =>{
        console.log(this.state.foreignDelegation)
        this.setState({ foreignDelegation : !this.state.foreignDelegation})
        console.log(this.state.foreignDelegation)
    }

    enablePrivateCar = () =>{
        
        console.log(this.state.privateCar)
        this.setState({ privateCar : !this.state.privateCar})
        console.log(this.state.privateCar)
    }

    handleSubmit = (event) => {
        if(!this.state.privateCar){
            delete(this.state.delegation['distance'])
            delete(this.state.delegation['greaterthan960cm3'])
        }
        if(!this.state.foreignDelegation){
            delete(this.state.delegation['guaranteedForeignSupper'])
            delete(this.state.delegation['guaranteedForeignDinner'])
            delete(this.state.delegation['guaranteedForeignBreakfast'])
            delete(this.state.delegation['crossingHomeBorder'])
            delete(this.state.delegation['crossingForeignBorder'])
        }
        if(this.state.foreignDelegation){
        this.state.delegation['foreignAllowance'] = document.getElementById("foreignAllowance").value;
        }
        console.log('i am here')
        let delNumber = this.props.match.params.id;
        if(this.checkValidation()){
            axios.post("/delegations/worker/add/" + currentUser() + "/" + delNumber,this.state.delegation, jwtHeader())
            .then(response => {
                if(response.status = HTTPCodes.Success){
                    Swal.fire(
                        'Delegation submitted successfully',
                        '',
                        'success'
                    )  
                    this.props.history.push("/yourdelegations")                  
                }
            }).catch(error => {
                console.log("blad", error.response.data)
            Swal.fire(
                'An error has occured. Please try again',
                '',
                'error'
            )
        });
        event.preventDefault();
    } else {
        Swal.fire(
            'Please fill out the form appropriately',
            '',
            'error'
        )
        
    }
    event.preventDefault();
    };


    renderForeignDelegation = () => {
        if (this.state.foreignDelegation) {
            return (
                <React.Fragment>
                    <FormGroup>
                        <FormLabel> Crossing foreign border</FormLabel>
                        <FormControl id="crossingForeignBorder" value={this.state.delegation["crossingForeignBorder"]} onChange={(event) => this.handleChangeProperty(event, "crossingForeignBorder")} isInvalid={!this.state.valid["crossingForeignBorder"]} type="datetime-local"/>
                        <FormControl.Feedback type="invalid">Crossing Foreign border date must be later than start date and earlier than crossing home border date.</FormControl.Feedback>
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Crossing home border</FormLabel>
                        <FormControl id="crossingHomeBorder" value={this.state.delegation["crossingHomeBorder"]} onChange={(event) => this.handleChangeProperty(event, "crossingHomeBorder")} isInvalid={!this.state.valid["crossingHomeBorder"]} type="datetime-local"/>
                        <FormControl.Feedback type="invalid">Crossing home border must be later than crossing foreign border and earlier than end date.</FormControl.Feedback>
                    </FormGroup>
                    
                    <FormGroup   >
                        <InputGroup >
                        <Form.Label className="input-destination-group" id="inputGroupAppend">Foreign Allowance</Form.Label>
                        <Form.Control className="foreign-allowance"
                        type="number"
                         placeholder="Foreign Allowance"
                        aria-describedby="inputGroupAppend"
                          label="Foreign Allowance"
                         id="foreignAllowance"
                         value={this.state.delegation['foreignAllowance']}
                          onChange={(event) => this.handleChangeProperty(event, "foreignAllowance")}
                          isInvalid={!this.state.valid["foreignAllowance"]}
                          defaultValue="60"
                      /> 
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
        }
    };

    renderHomeDelegation = () => {
        console.log(this.state.foreignDelegation)
        return (
            <React.Fragment>
            <InputGroup >
            <Form.Label className="input-delegation-group1" id="inputGroupAppend">Delegation Number</Form.Label>
                <Form.Control className="delegation-number1"
                   
                  placeholder="Delegation Number"
                  aria-describedby="inputGroupAppend"
                  label="Delegation Number"
                  id="delegationNumber"
                  value={this.state.delegation['delegationNumber']}
                  disabled="true"
                 
                /> 
                </InputGroup>
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
                    <FormControl id="startDate" value={this.state.delegation["startDate"]} onChange={(event) => this.handleChangeProperty(event, "startDate")} isInvalid={!this.state.valid["startDate"]} type="datetime-local"/>
                    <FormControl.Feedback type="invalid">Start date must be before end date.</FormControl.Feedback>
                </FormGroup>

                <FormGroup>
                <FormLabel>Delegation's end date</FormLabel>
                    <FormControl id="endDate" value={this.state.delegation["endDate"]} onChange={(event) => this.handleChangeProperty(event, "endDate")} isInvalid={!this.state.valid["endDate"]} type="datetime-local" />
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
                <h1 className="header1">Draft Delegation</h1>
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

export default DraftWorkerDelegationDetails;
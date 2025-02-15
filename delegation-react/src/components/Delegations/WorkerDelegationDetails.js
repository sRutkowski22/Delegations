import axios from 'axios';
import React, { Component } from 'react';
import {Button, Form, FormGroup, FormControl, FormLabel, InputGroup} from 'react-bootstrap';
import { canAccessPage, currentRole, extractRole, jwtHeader } from '../../Utility/Constants';
import './DelegationDetails.css';
import Moment from 'react-moment';
import Roles from '../auth/Roles';
import Swal from 'sweetalert2';
import HTTPCodes from '../auth/HTTPCodes';
import DelegationStatuses from '../../Utility/DelegationStatuses.js';

class WorkerDelegationDetails extends Component{

    constructor(props){
        super(props);
        this.state = {
            delegation: {
                delegationStatus: {
                   
                }
            },
            delegationStatus: '',
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

    componentDidMount () {
        console.log("previous id " + this.props.match.params.id)
        let delNumber = this.props.match.params.id;
        console.log("previous id " + delNumber)
        if(currentRole() === Roles.WORKER){
        axios.get("/delegations/worker/getdelegationbynumber/" + delNumber, jwtHeader())
        .then(response => {
            const tempdel = response.data;
            this.setState( {delegation:tempdel})
            console.log(this.state.delegation.crossingForeignBorder)
            this.setState({  greaterThan900cm3: tempdel.greaterThan900cm3  })
            
            if(tempdel.delegationStatus.statusName === DelegationStatuses.DRAFT)
            this.props.history.push("/yourdelegations/draft/"+delNumber)

            console.log(response.data)
        
        }).catch(error => {
            console.log(error.message);
        })
    }else if (currentRole() === Roles.ACCOUNTANT){
        axios.get("/delegations/accountant/getdelegationbynumber/" + delNumber, jwtHeader())
        .then(response => {
            const tempdel = response.data;
            this.setState( {delegation:tempdel,
            delegationStatus: tempdel.delegationStatus.statusName})

            console.log(response.data)
        }).catch(error => {
            console.log(error.message);
        })
    }
    }
    
    

    
    renderForeignDelegation = () => {
            return (
                <React.Fragment>
                    
                    <FormLabel className="foreign-delegation-title">Foreign delegation</FormLabel>
                    <Form.Row className="home-dates">
                    <FormGroup>
                        <FormLabel> Crossing foreign border:</FormLabel>
                        <Moment date={this.state.delegation.crossingForeignBorder} format="DD-MM-yyyy HH:mm"/>
                        <FormControl.Feedback type="invalid">Crossing Foreign border date must be later than start date and earlier than crossing home border date.</FormControl.Feedback>
                        {/* <FormControl id="crossingForeignBorder" value={this.state.delegation.crossingForeignBorder} onChange={(event) => this.handleChangeProperty(event, "crossingForeignBorder")} isInvalid={!this.state.valid["crossingForeignBorder"]} type="datetime-local"/> */}
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Crossing home border:</FormLabel>
                        <Moment date={this.state.delegation.crossingHomeBorder} format="DD-MM-yyyy HH:mm"/>
                    </FormGroup>
                    </Form.Row>
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
                          
                          defaultValue="60"
                          disabled={this.state.disabled}
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
                        <Form.Check id="guaranteedForeignBreakfast" type="checkbox" checked={this.state.delegation['guaranteedForeignBreakfast']} label="Breakfast guarantee" disabled="true"/> 
                    </FormGroup >
                    <FormGroup className="checkbox-form">
                        <Form.Check id="guaranteedForeignDinner" type="checkbox" checked={this.state.delegation['guaranteedForeignDinner']} label="Dinner guarantee"   disabled="true"/>
                    </FormGroup>
                    <FormGroup className="checkbox-form">
                        <Form.Check id="guaranteedForeignSupper"  type="checkbox" checked={this.state.delegation['guaranteedForeignSupper']} label="Supper guarantee"  disabled="true"/>
                    </FormGroup>
                    
                    </div>
                </React.Fragment>
            );
        
    };

    renderHomeDelegation = () => {
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
                  disabled="true"
                 
                /> 
                
              </InputGroup>
            </FormGroup> 
            <FormGroup  className="advance-payment-group1" >
            <Form.Label  id="inputGroupAppend">Advance payment</Form.Label>
            <InputGroup >
                
                <Form.Control
                  type="number"
                  placeholder="Advance payment"
                  aria-describedby="inputGroupAppend"
                  label="Advance payment"
                  id="advancePayment"
                  value={this.state.delegation['advancePayment']}
                  
                  disabled="true"
                 
                /> 
                <InputGroup.Append>
                  <InputGroup.Text id="inputGroupAppend">ZŁ</InputGroup.Text>
                </InputGroup.Append>
                <Form.Control.Feedback type="invalid" tooltip>
                  
                </Form.Control.Feedback>
              </InputGroup>
            </FormGroup>
            
            </Form.Row>

            <Form.Row className="home-dates">
                <FormGroup >
                    <FormLabel>Delegation's start date:</FormLabel>
                    <Moment date={this.state.delegation.startDate} format="DD-MM-yyyy HH:mm"/>
                    <FormControl.Feedback type="invalid">Start date must be before end date.</FormControl.Feedback>
                </FormGroup>

                <FormGroup >
                <FormLabel>Delegation's end date:</FormLabel>
                <Moment date={this.state.delegation.endDate} format="DD-MM-yyyy HH:mm"/>
                    <FormControl.Feedback type="invalid">End date must be after start date.</FormControl.Feedback>
                </FormGroup>
                </Form.Row >
                
                    <Form.Row className="checkboxes" >
                <FormGroup  className="checkbox-form">
                    <Form.Check id="guaranteedDomesticBreakfast" type="checkbox" checked={this.state.delegation['guaranteedDomesticBreakfast']} label="Breakfast guarantee"  onChange={(event) => this.handleChangeProperty(event, "guaranteedDomesticBreakfast")} disabled="true"></Form.Check> 
                </FormGroup >
                <FormGroup className="checkbox-form">
                    <Form.Check id="guaranteedDomesticDinner" type="checkbox" checked={this.state.delegation['guaranteedDomesticDinner']} label="Dinner guarantee"  onChange={(event) => this.handleChangeProperty(event, "guaranteedDomesticDinner")} disabled="true" ></Form.Check>
                </FormGroup>
                <FormGroup className="checkbox-form">
                    <Form.Check id="guaranteedDomesticSupper"  type="checkbox" checked={this.state.delegation['guaranteedDomesticSupper']} label="Supper guarantee" value={this.state.guaranteedDomesticSupper} onChange={(event) => this.handleChangeProperty(event, "guaranteedDomesticSupper")} disabled="true"></Form.Check>
                </FormGroup>
                </Form.Row>
                <Form.Row>
                <FormGroup className="checkbox-form">
                    <Form.Check  id="guaranteedAccommodation"  type="checkbox" checked={this.state.delegation['guaranteedAccommodation']} label="Accomodation guarantee" value={this.state.guaranteedAccommodation} onChange={(event) => this.handleChangeProperty(event, "guaranteedAccommodation")} disabled="true"></Form.Check>
                </FormGroup>
                <FormGroup className="checkbox-form">
                    <Form.Check  id="homeTransportCharge"  type="checkbox"  checked={this.state.delegation['homeTransportCharge']} label="Transport charge" value={this.state.homeTransportCharge} onChange={(event) => this.handleChangeProperty(event, "homeTransportCharge")} disabled="true"></Form.Check>
                </FormGroup>
                </Form.Row>

                
              
                
            </React.Fragment>
        );
    }

    renderPrivateCar = () => {
        if(this.state.delegation.distance !== 0){
            if(this.state.delegation.delegationStatus.statusName !== DelegationStatuses.WITHDRAWN){
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
                  disabled="true"
                /> 
                <InputGroup.Append>
                  <InputGroup.Text id="inputGroupPrepend">KM</InputGroup.Text>
                </InputGroup.Append>
               
              </InputGroup>
            </FormGroup>
            <FormGroup className="checkbox-form-engine">
                    
                    <Form.Check className="checkbox-form-acc" 
                    id="guaranteedDomesticSupper"  type="checkbox" checked={this.state.delegation['greaterThan900cm3']} label="Engine at least 900cm3" value={this.state.guaranteedDomesticSupper}  disabled="true"></Form.Check>
                </FormGroup>
            </Form.Row>
        </React.Fragment>
        );
            }else{
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
                          value={this.state.delegation.distance}
                          onChange={(event) => this.handleChangeProperty(event, "distance")}
                       
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
                            <Form.Check className="checkbox-form-acc" 
                            id="greaterThan900cm3"  
                            type="checkbox"  
                            checked={this.state.delegation.greaterThan900cm3} 
                            label="Engine at least 900cm3" 
                            value={this.state.delegation.greaterThan900cm3} 
                            onChange={(event) => this.handleChangeProperty(event, "greaterThan900cm3")}  ></Form.Check>
                        </FormGroup>
                    </Form.Row>
                </React.Fragment>
                )
            }
    }else{
            return (<div></div>)
        }
    }

    renderForm = () => {
        return(
            <Form className="add-del-form" onSubmit={this.handleSubmit}>
                <h1 className="header1">Delegation Details</h1>
                {this.renderHomeDelegation()}
                <div className="header1"></div>
                {this.renderForeignDelegation()} 
                <div className="header1"></div>
                {this.renderPrivateCar()}
                <div className="header1"></div>
                {this.renderDelegationStatus()} 
                <Form.Row className="button-row">
                <Button className="buttonnn" onClick={this.handleGoBack}>Back</Button>
                {this.changeStatusButton()}
                </Form.Row>
            </Form>
        );
    }

    handleSubmit = (event) =>{
        let delNumber = this.props.match.params.id
        
        this.state.delegation.delegationStatus.statusName = DelegationStatuses.SUBMITTED;
        let delStatus = this.state.delegation.delegationStatus.statusName;
        axios.put('delegations/worker/resubmit/'+delNumber+'/'+delStatus, this.state.delegation, jwtHeader())
        .then(response => {
            if(response.status === HTTPCodes.Success){
                Swal.fire(
                    'Delegation submitted successfully',
                    '',
                    'success'
                ) 
                this.props.history.push("/yourdelegations");                   
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
    }

    handleGoBack = () =>{
        this.props.history.goBack();
    }

    handleChangeProperty = (event, property) => {
        let tempDel = {...this.state.delegation};
        console.log('value', event.target.value)
        console.log('value', this.state.greaterThan900cm3)
        
        switch(property){
            case "greaterThan900cm3":
                tempDel[property]=!tempDel[property]
                break;    
            default:
                tempDel[property] = event.target.value;
                break;
        }
        this.state.delegation = tempDel;
        console.log(this.state.delegation)
        this.forceUpdate();
    };

    changeStatusButton = () =>{
        if(this.state.delegation.delegationStatus.statusName === DelegationStatuses.WITHDRAWN )
        return(
            <Button type="submit">Submit</Button>
        )
        else{
            return(
                <div></div>
            )
        }
    }

    handleChangeStatus = (event) =>{
        console.log(this.state.delegationStatus)
        console.log(event.target.value)
        this.setState({delegationStatus: event.target.value})
        console.log(this.state.delegationStatus)
    }

    renderDelegationStatus = () =>{
       
            console.log('before render ',this.state.delegation["delegationStatus"]["statusName"])    
            if(this.state.delegation.delegationStatus.statusName === DelegationStatuses.WITHDRAWN)
        return(
            <Form.Row className="status-row">
                
            <Form.Label>Delegation Status</Form.Label>
            
            <Form.Control 
            Value={this.state.delegation.delegationStatus.statusName}
            onChange={(event) => this.handleChangeStatus(event)}
            disabled="true"
            >
            </Form.Control>
            
            <Form.Label className="text-area">Note</Form.Label>
            <Form.Control as="textarea" rows={3} 
            value={this.state.delegation.note}
            disabled="true"/>
            

     </Form.Row>
        )
        else
        return(
            <Form.Row className="status-row">
                
            <Form.Label>Delegation Status</Form.Label>
            
            <Form.Control 
            Value={this.state.delegation.delegationStatus.statusName}
            onChange={(event) => this.handleChangeStatus(event)}
            disabled="true"
            >
            </Form.Control>
            
         
            

     </Form.Row>
        )
        
    }

    render(){

        
        return(
            <div>
                
                {this.renderForm()};

            </div>
            
        );
    }

}

export default WorkerDelegationDetails;
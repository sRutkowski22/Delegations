import React, { Component } from 'react';
import {Button, Form, FormGroup, FormControl, FormLabel} from 'react-bootstrap';
import moment from 'moment';
import { canAccessPage, extractRole } from '../../Utility/Constants';
import './AddDelegation.css'

class AddDelegation extends Component{

    constructor(props){
        super(props);
        canAccessPage(this.props,extractRole(window.location.pathname));
        this.state = {
            delegation: {},
            valid: {"crossingForeignBorder": true, "crossingHomeBorder": true, "startDate": true, "endDate": true},
            foreignDelegation: false
        }
    }

    checkValidation = () => {
        let validated = true;
        let tempValid = {...this.state.valid};
        if (this.state.changePassword) {
            // tempValid["password"] = document.getElementById("password").value.length >= 8;
            // tempValid["confirmPassword"] = document.getElementById("confirmPassword").value === document.getElementById("password").value;
        }
        // tempValid["firstName"] = document.getElementById("firstName").value.length !== 0;
        // tempValid["lastName"] = document.getElementById("lastName").value.length >= 8;
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
        tempDel[property] = event.target.value;
        this.setState({delegation: tempDel});
        this.validateProperty(property);
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
                break;
            case "crossingHomeBorder":
                tempValid["crossingHomeBorder"] = moment(document.getElementById("crossingHomeBorder").value).isAfter(moment(document.getElementById("crossingForeignBorder").value)) && moment(document.getElementById("crossingHomeBorder").value).isBefore(moment(document.getElementById("endDate").value));
                if(tempValid["crossingHomeBorder"] === true)
                tempValid["crossingForeignBorder"] = true;
                break;
            default:
                break;
        }
        this.setState({valid: tempValid});
    };

    enableForeignDelegation = () =>{
        this.setState({foreignDelegation: !this.state.foreignDelegation})
    }

    renderForeignDelegation = () => {
        if (this.state.foreignDelegation) {
            return (
                <React.Fragment>
                    <FormGroup>
                        <FormLabel>Crossing foreign border</FormLabel>
                        <FormControl id="crossingForeignBorder" value={this.state.delegation["crossingForeignBorder"]} onChange={(event) => this.handleChangeProperty(event, "crossingForeignBorder")} isInvalid={!this.state.valid["crossingForeignBorder"]} type="datetime-local" timeFormat="YYYY-MM-DD HH:mm"/>
                        <FormControl.Feedback type="invalid">Crossing Foreign border date must be later than start date and earlier than crossing home border date.</FormControl.Feedback>
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Crossing home border</FormLabel>
                        <FormControl id="crossingHomeBorder" value={this.state.delegation["crossingHomeBorder"]} onChange={(event) => this.handleChangeProperty(event, "crossingHomeBorder")} isInvalid={!this.state.valid["crossingHomeBorder"]} type="datetime-local" timeFormat="YYYY-MM-DD HH:mm"/>
                        <FormControl.Feedback type="invalid">Crossing home border must be later than crossing foreign border and earlier than end date.</FormControl.Feedback>
                    </FormGroup>
                </React.Fragment>
            );
        }
    };

    renderHomeDelegation = () => {

        return (
            <React.Fragment>
                <FormGroup>
                    <FormLabel>Delegation's start date</FormLabel>
                    <FormControl id="startDate" value={this.state.delegation["startDate"]} onChange={(event) => this.handleChangeProperty(event, "startDate")} isInvalid={!this.state.valid["startDate"]} type="datetime-local" timeFormat="yyyy-MM-dd HH:mm"/>
                    <FormControl.Feedback type="invalid">Start date must be before end date.</FormControl.Feedback>
                </FormGroup>

                <FormGroup>
                <FormLabel>Delegation's end date</FormLabel>
                    <FormControl id="endDate" value={this.state.delegation["endDate"]} onChange={(event) => this.handleChangeProperty(event, "endDate")} isInvalid={!this.state.valid["endDate"]} type="datetime-local" timeFormat="yyyy-MM-dd HH:mm"/>
                    <FormControl.Feedback type="invalid">End date must be after start date.</FormControl.Feedback>
                </FormGroup>
            </React.Fragment>
        );
    }

    renderForm = () => {
        return(
            <Form className="add-del-form" onSubmit={this.handleSubmit}>
                <h1 className="welcome">Add new delegation</h1>
                {this.renderHomeDelegation()}
                <Form.Switch id="foreignDelegationSwitch" label="Foreign Delegation" checked={this.state.foreignDelegation} onChange={this.enableForeignDelegation} style={{"margin-bottom": "0.75em"}}/>
                    {this.renderForeignDelegation()}

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

export default AddDelegation;
// const { ReactComponent } = require("*.svg");
import React, {Component} from 'react';
import {Button,Form, FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import './Register.css';
import axios from 'axios';
import swal from "sweetalert";
import 'bootstrap/dist/css/bootstrap.css';

 class Register extends Component{

    componentDidMount(){
        document.title="Register"
    }

    constructor(props){
        super(props);

        this.state = {
            user: { "email": "",
            "firstName": "",
            "lastName": "",
            "password": "",
            "password_confirmation":"",
            "accessLevel":[
                        {
                            "levelName": "WORKER",
                            "active": true
                        },
                        {
                            "levelName": "ACCOUNTANT",
                            "active": false
                        },
                        {
                            
                            "levelName": "ADMIN",
                            "active": false
                        }
                
            ] },
            valid: {"email": true, "password": true, "confirmPassword": true, "firstName": true, "lastName": true}
           
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    validateProperty = (property) => {
        let tempValid = {...this.state.valid};
        switch (property) {
            case "email":
                tempValid["email"] = document.getElementById("email").value.length !== 0;
                break;
            case "password":
                tempValid["password"] = document.getElementById("password").value.length >= 8;
                break;
            case "confirmPassword":
                tempValid["password_confirmation"] = document.getElementById("password_confirmation").value === document.getElementById("password").value;
                break;
            case "firstName":
                tempValid["firstName"] = document.getElementById("firstName").value.length !== 0;
                break;
            case "lastName":
                tempValid["lastName"] = document.getElementById("lastName").value.length !== 0;
                break;
            default:
                break;
        }
        this.setState({valid: tempValid});
    };

    handleChange = (event, property) => {
        let tempUser = {...this.state.user};
        tempUser[property] = event.target.value;
        this.setState({user: tempUser});
        this.validateProperty(property);
    }

    checkValidation = () => {
        let validated = true;
        let tempValid = {...this.state.valid};
        tempValid["email"] = document.getElementById("email").value.length !== 0;
        tempValid["password"] = document.getElementById("password").value.length >= 8;
        tempValid["password_confirmation"] = document.getElementById("password_confirmation").value === document.getElementById("password").value;
        tempValid["firstName"] = document.getElementById("firstName").value.length !== 0;
        tempValid["lastName"] = document.getElementById("lastName").value.length !== 0;
        for (let key in tempValid) {
            if (tempValid.hasOwnProperty(key) && tempValid[key] === false) {
                this.validateProperty(key);
                validated = false;
                break;
            }
        }
        return validated;
    };

    handleSubmit(event){
        if(this.checkValidation()){
        delete this.state.user["password_confirmation"];
        
        
        console.log(this.state.user);
        
        axios.post("/accounts/add",  this.state.user )
        .then(response => {
            console.log(response.message, response);
            if(response.status === 200){
                swal({
                    title: "Registration completed",
                    icon: "success",
                    closeOnClickOutside: true
                });
                 this.props.history.push("/");
            }
        }).catch(error => {
            this.setState({errorMessage: error.message});
            console.log("registration error", error.response.data);
            if(error.response.status === 420){
                swal({
                    title: "Email was already used",
                    icon: "error",
                    closeOnClickOutside: true
                });
            }else
            swal({
                title: "An error occurred",
                text: "Please try again",
                icon: "error",
            });
        });
        event.preventDefault();
    }else {
            swal({
                title: "Please fill out every field in the form correctly",
                icon: "warning"
                // closeOnClickOutside: true
            });
            event.preventDefault();
        }
    };
    render(){
        return(
            <div>
                  
            
             <Form className="registration-form" onSubmit={this.handleSubmit}>
             <h2 className="registration">Registration</h2>
             <FormGroup className="form-group">
                 <FormLabel> Enter Email</FormLabel>
                 
                 <FormControl type="text" id="email" value={this.state.user["email"]} onChangeCapture={(event) => this.handleChange(event, "email")} isInvalid={!this.state.valid["email"]}/>
                 <FormControl.Feedback id="control" type="invalid">email must have a "@" mark.</FormControl.Feedback>
             </FormGroup>
             <FormGroup className="form-group">
                 <FormLabel>Enter Password</FormLabel>
                 
                 <FormControl type="password" id="password" value={this.state.user["password"]} onChangeCapture={(event) => this.handleChange(event, "password")} isInvalid={!this.state.valid["password"]}/>
                 <FormControl.Feedback type="invalid">Password must be at least 8 characters long.</FormControl.Feedback>
             </FormGroup>
             <FormGroup className="form-group">
                 <FormLabel>Confirm Password</FormLabel>
                 
                 <FormControl type="password" id="password_confirmation" value={this.state.user["password_confirmation"]} onChange={(event) => this.handleChange(event, "password_confirmation")} isInvalid={!this.state.valid["password_confirmation"]}/>
                 <FormControl.Feedback type="invalid">Passwords must be the same.</FormControl.Feedback>
             </FormGroup>
             <FormGroup className="form-group">
                 <FormLabel> Enter first name</FormLabel>
                
                 <FormControl type="text" id="firstName" value={this.state.user["firstName"]} onChange={(event) => this.handleChange(event, "firstName")} isInvalid={!this.state.valid["firstName"]}/>
                 <FormControl.Feedback type="invalid">Please provide your first name.</FormControl.Feedback>
             </FormGroup>
             <FormGroup className="form-group">
                 <FormLabel> Enter last name</FormLabel>
                
                 <FormControl type="text" id="lastName" value={this.state.user["lastName"]} onChange={(event) => this.handleChange(event, "lastName")} isInvalid={!this.state.valid["lastName"]}/>
                 <FormControl.Feedback type="invalid">Please provide your last name.</FormControl.Feedback>
             </FormGroup>
             <Button type="submit" className="register-button" >Submit

             </Button>
         </Form>
         </div>
        );
    }
}

export default Register;
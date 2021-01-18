import React, { Component } from 'react';
import {Button, Form, FormGroup, FormControl, FormLabel} from 'react-bootstrap';
import Cookies from "universal-cookie";
import './Login.css';
import axios from 'axios';
import swal from "sweetalert";
import Swal from 'sweetalert2';
import jwt_decode from "jwt-decode";
import {currentUser} from "../../Utility/Constants.js";

 class Login extends Component{

    componentDidMount(){
        document.title = "Login";
    }

    constructor(props){
        super(props);
        this.state={
            user: {"email": "", "password": ""},
            valid: {"email": true, "password": true}
        };
        this.cookies = new Cookies();
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
                tempValid["password"] = document.getElementById("password").value.length !== 0;
                break;
            default:
                break;
        }
        this.setState({valid: tempValid});
    };

    checkValidation = () => {
        let validated = true;
        let tempValid = {...this.state.valid};
        tempValid["email"] = document.getElementById("email").value.length !== 0;
        tempValid["password"] = document.getElementById("password").value.length !== 0;
        for (let key in tempValid) {
            if (tempValid.hasOwnProperty(key) && tempValid[key] === false) {
                this.validateProperty(key);
                validated = false;
                break;
            }
        }
        return validated;
    };

    handleChange = (event, property) => {
        let tempUser = {...this.state.user};
        tempUser[property] = event.target.value;
        this.setState({user: tempUser});
        this.validateProperty(property);
    }

    handleSubmit (event){

     if (this.checkValidation()) {
         console.log(this.state.user);
            axios.post("/login", this.state.user)
                .then(response => {
                    console.log(response.message,response);
                    console.log("current user przed " + currentUser());
                    this.cookies.set("jwt", response.data["jwt"], {path: "/"});
                    console.log("current user po " + currentUser());
                    console.log(this.cookies.get("jwt"));
                    let jwt = require("jsonwebtoken");
                    let user = jwt.decode(this.cookies.get("jwt"))["sub"];
                    let auth = jwt.decode(this.cookies.get("jwt"))["auth"][0]["authority"];
                    let decoded = jwt_decode(this.cookies.get("jwt"));
                    console.log(decoded);
                    console.log("user i dostep " + user + " " + auth);
                   
                    this.props.history.push("/");
                    window.location.reload();
                    Swal.fire(
                        'Login completed!',
                        '',
                        'success'
                    )
                }).catch(error => {
                    console.log("blad", error.response.data)
                swal({
                    title: error.response.data,
                    icon: "error",
                    closeOnClickOutside:true
                });
            });
            event.preventDefault();
        } else {
            swal({
                title: "An error has occured. Please try again",
                icon: "warning"
            });
        }
        event.preventDefault();
    };

    render(){
        return(
            
            <Form className="login-form" onSubmit={this.handleSubmit}>
                            <h1 className="welcome">Welcome</h1>

                <FormGroup className="form-group">
                    <FormLabel> Enter Email</FormLabel>
                    <FormControl type="text" id="email" value={this.state.user["email"]} onChange={(event) => this.handleChange(event, "email")} isInvalid={!this.state.valid["email"]}/>
                    <FormControl.Feedback id="control" type="invalid">Please provide your email.</FormControl.Feedback>
                </FormGroup>
                <FormGroup className="form-group">
                    <FormLabel>Enter Password</FormLabel>
                    <FormControl type="password" id="password" value={this.state.user["password"]} onChange={(event) => this.handleChange(event, "password")} isInvalid={!this.state.valid["email"]}/>
                     <FormControl.Feedback type="invalid">Please provide your password.</FormControl.Feedback>
                </FormGroup>
                <Button type="submit" className="login-button">
                    Submit
                </Button>
            </Form>
        );
    }
}
    export default Login;

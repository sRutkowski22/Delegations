import React, { Component } from 'react';
import {Button, Form, FormGroup, FormControl, FormLabel} from 'react-bootstrap';
import Cookies from "universal-cookie";
import './Login.css';
import axios from 'axios';
import swal from "sweetalert";
// import "../Button.css";

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
            default:
                break;
        }
        this.setState({valid: tempValid});
    };

    checkValidation = () => {
        let validated = true;
        let tempValid = {...this.state.valid};
        tempValid["email"] = document.getElementById("email").value.length !== 0;
        tempValid["password"] = document.getElementById("password").value.length >= 8;
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

    handleSubmit = () =>{

     if (this.checkValidation()) {
            axios.post("/login", this.state.user)
                .then(response => {
                    this.cookies.set("jwt", response.data["jwt"], {path: "/"});
                    this.props.history.push("/");
                    window.location.reload();
                }).catch(error => {
                swal({
                    title: error.response.data,
                    icon: "error"
                });
            });
        } else {
            swal({
                title: "Please fill out every field in the form",
                icon: "warning",
                closeOnClickOutside: true
            });
        }
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
                <Button  className="login-button">
                    Submit
                </Button>
            </Form>
        );
    }
}
    export default Login;

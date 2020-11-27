import React, { Component } from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import './Login.css';
// import "../Button.css";

 class Login extends Component{

    componentDidMount(){
        document.title = "Login";
    }
    render(){
        return(

            <Form className="login-form">
                            <h1 className="welcome">Welcome</h1>

                <FormGroup className="form-group">
                    <Label> Enter Email</Label>
                    <Input  type="email" placeholder="Email"/>
                </FormGroup>
                <FormGroup className="form-group">
                    <Label>Enter Password</Label>
                    <Input  type="password" placeholder="Password"/>
                </FormGroup>
                <Button className="login-button">
                    Submit
                </Button>
            </Form>
        );
    }
}
    export default Login;

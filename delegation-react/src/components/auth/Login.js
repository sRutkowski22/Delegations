import React, { Component } from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import './Login.css';

 class Login extends Component{

    componentDidMount(){
        document.title = "Login";
    }
    render(){
        return(
            
            <Form className="login-form">
                <h2 className="text-center">Welcome</h2>
                <FormGroup>
                    <Label> Enter Email</Label>
                </FormGroup>
                <FormGroup>
                    <Input  type="email" placeholder="Email"/>
                </FormGroup>
                <FormGroup>
                    <Label>Enter Password</Label>
                </FormGroup>
                <FormGroup>
                    <Input  type="password" placeholder="Password"/>
                </FormGroup>
            </Form>
        );
    }
}
    export default Login;

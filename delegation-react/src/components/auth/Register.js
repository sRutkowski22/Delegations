// const { ReactComponent } = require("*.svg");
import React, {Component} from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import './Register.css';

 class Register extends Component{

    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            password_confirmation:"",
            firstname: "",
            lastname: ""
        }
    }
    render(){
        return(
            <div>
                  
            
             <Form className="registration-form">
             <h2 className="registration">Registration</h2>
             <FormGroup className="form-group">
                 <Label> Enter Email</Label>
                 <Input  type="email" placeholder="Email"/>
             </FormGroup>
             <FormGroup className="form-group">
                 <Label>Enter Password</Label>
                 <Input  type="password" placeholder="Password"/>
             </FormGroup>
             <FormGroup className="form-group">
                 <Label>Confirm Password</Label>
                 <Input  type="password" placeholder="Password"/>
             </FormGroup>
             <FormGroup className="form-group">
                 <Label> Enter Firstname</Label>
                 <Input  type="text" placeholder="Firstname"/>
             </FormGroup>
             <FormGroup className="form-group">
                 <Label> Enter Lastname</Label>
                 <Input  type="text" placeholder="Lastname"/>
             </FormGroup>
             <Button className="register-button" onClick>Submit

             </Button>
         </Form>
         </div>
        );
    }
}

export default Register;
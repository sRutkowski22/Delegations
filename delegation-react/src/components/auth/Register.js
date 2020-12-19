// const { ReactComponent } = require("*.svg");
import React, {Component} from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import './Register.css';
import axios from 'axios';

 class Register extends Component{

    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: "",
            password_confirmation:"",
            firstname: "",
            lastname: "",
            accesslevel: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event){
     
        const {
            email,
            firstname,
            lastname,
            password} = this.state
        
        console.log(email, firstname, lastname, password);
        
        axios.post("http://localhost:8080/accounts/add", 
            {
           
            
           
                email: email,
                firstName: firstname,
                lastName: lastname,
                password: password,
                accessLevel: [
                    {
                        levelName: "worker",
                        active : true
                    },
                    {
                        levelName: "accountant",
                        active : false
                    },
                    {
                        levelName: "admin",
                        active : false
                    }
                ]

                
              
            }
        
        ).then(response => {
            console.log("registration res", response);
        }).catch(error => {
            this.setState({errorMessage: error.message});
            console.log("registration error", error);
        });
        event.preventDefault();
    }
    render(){
        return(
            <div>
                  
            
             <Form className="registration-form" onSubmit={this.handleSubmit}>
             <h2 className="registration">Registration</h2>
             <FormGroup className="form-group">
                 <Label> Enter Email</Label>
                 <Input  type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required/>
             </FormGroup>
             <FormGroup className="form-group">
                 <Label>Enter Password</Label>
                 <Input  type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
             </FormGroup>
             <FormGroup className="form-group">
                 <Label>Confirm Password</Label>
                 <Input  type="password" name="password_confirmation" placeholder="Password" value={this.state.password_confirmation} onChange={this.handleChange} required/>
             </FormGroup>
             <FormGroup className="form-group">
                 <Label> Enter Firstname</Label>
                 <Input  type="text" name="firstname" placeholder="Firstname" value={this.state.firstname} onChange={this.handleChange} required/>
             </FormGroup>
             <FormGroup className="form-group">
                 <Label> Enter Lastname</Label>
                 <Input  type="text" name="lastname" placeholder="Lastname" value={this.state.lastname} onChange={this.handleChange} required/>
             </FormGroup>
             <Button type="submit" className="register-button" >Submit

             </Button>
         </Form>
         </div>
        );
    }
}

export default Register;
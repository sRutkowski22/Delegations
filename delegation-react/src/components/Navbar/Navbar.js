import React, { Component } from 'react';
import { MenuItems } from "./MenuItems.js";
import './Navbar.css'
import {Button} from "../Button"
import {  withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
import { currentUser, currentRole } from "../../Utility/Constants.js";
import Cookies from "universal-cookie";

class Navbar extends Component{

    constructor(props){
        super(props);
        this.redirectToLogin = this.redirectToLogin.bind(this);
        this.redirectToRegistration= this.redirectToRegistration.bind(this);
        this.renderForUnauthorized = this.renderForUnauthorized.bind(this);
        this.renderForAuthorized = this.renderForAuthorized.bind(this);
        this.cookies = new Cookies();
    }

    redirectToLogin  () {
        
        let path = '/login';
        this.props.history.push(path);
    }

    redirectToRegistration  () {
        
        let path = '/register';
        this.props.history.push(path);
    }

    logout = () => {
        this.cookies.remove("jwt", {path: "/"});
        window.location.replace("/");
    }

    state = { clicked: false}

    goHome () {
        let path = '/'
        this.props.history.push(path);
    }

    handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }

    renderForUnauthorized = () =>{
        if(currentUser() === ""){
            return(
                <nav className="NavbarItems">
                <h1 className="navbar-logo"><Link to='/' className="navbar-logo">Delegations</Link><i className="fas fa-globe-europe"></i></h1>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
            
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
          
                    
                </ul>
             
                <Button className="button2" onClick={this.redirectToLogin}>Sign in</Button>
                </nav>
            );
        }
       
    }

    renderForAuthorized = () =>{
        if(currentUser() !== ""){
            return(
                <nav class="navabar sticky-top">
                    <nav className="NavbarItems">
                <h1 className="navbar-logo"><Link to='/' className="navbar-logo">Delegations</Link><i className="fas fa-globe-europe"></i></h1>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        if (item.role === currentRole() || item.role === '') {
                                
                        return(
                            <li key={index}>
                                <a className={item.className} href={item.url}>
                                {item.title}
                                </a>
                            </li>
                            
                        );
                        } 
                        return(
                            <div></div>
                        );
                   
                        
                    })}
                    
                </ul>
               
                
                <Button className="button1" onClick={this.logout}>Logout</Button>
                </nav>
                <div className="UserInfoNavbar">
                
                 <label className="userInfo" >Logged as: {currentUser()}</label>
                 <label className= "userInfo">Role: {currentRole()}</label>
               
                 </div>
                 
                </nav>
                
            );
        }
       
    }
    render(){
        return(
            <nav>
            {this.renderForUnauthorized()}
            {this.renderForAuthorized()}
            </nav>
            

        )
    }
}

export default withRouter(Navbar);
import React, { Component } from 'react';
import { MenuItems } from "./MenuItems"
import './Navbar.css'
import {Button} from "../Button"
import {  withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';

class Navbar extends Component{

    constructor(props){
        super(props);
        this.redirectToLogin = this.redirectToLogin.bind(this);
        this.redirectToRegistration= this.redirectToRegistration.bind(this);
    }

    redirectToLogin  () {
        
        let path = '/login';
        this.props.history.push(path);
    }

    redirectToRegistration  () {
        
        let path = '/register';
        this.props.history.push(path);
    }

    state = { clicked: false}

    goHome () {
        let path = '/'
        this.props.history.push(path);
    }

    handleClick = () => {
        this.setState({clicked: !this.state.clicked})
    }
    render(){
        return(
            <nav className="NavbarItems">
                <h1 className="navbar-logo"><Link to='/' className="navbar-logo">Delegations</Link><i className="fas fa-globe-europe"></i></h1>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return(
                            <li key={index}>
                                <a className={item.className} href={item.url}>
                                {item.title}
                                </a>
                            </li>
                        )
                    })}
                    
                </ul>
                <Button className="button1" onClick={this.redirectToRegistration}>Sign up</Button>
                <Button className="button2" onClick={this.redirectToLogin}>Sign in</Button>
            </nav>

        )
    }
}

export default withRouter(Navbar);
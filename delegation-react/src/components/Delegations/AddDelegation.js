import { Component } from 'react';
import {Button, Form, FormGroup, FormControl, FormLabel} from 'react-bootstrap';
import { canAccessPage, extractRole } from '../../Utility/Constants';

class AddDelegation extends Component{

    constructor(props){
        super(props);
        canAccessPage(this.props,extractRole(window.location.pathname));
    }
    render(){
        return(
            
            <Form className="login-form" onSubmit={this.handleSubmit}>
                            <h1 className="welcome">Welcome</h1>

            </Form>
        );
    }

}

export default AddDelegation;
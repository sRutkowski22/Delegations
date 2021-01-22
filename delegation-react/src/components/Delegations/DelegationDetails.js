import { Component } from 'react';
import {Button, Form, FormGroup, FormControl, FormLabel} from 'react-bootstrap';
import { canAccessPage, extractRole } from '../../Utility/Constants';
import './AddDelegation.css'

class DelegationDetails extends Component{

    constructor(props){
        super(props);
        // canAccessPage(this.props,extractRole(window.location.pathname));
    }
    render(){
        return(
            
            <Form className="add-del-form" onSubmit={this.handleSubmit}>
                            <h1 className="welcome">Delegation delegation</h1>

            </Form>
        );
    }

}

export default DelegationDetails;
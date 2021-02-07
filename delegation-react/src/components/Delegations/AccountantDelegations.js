import axios from 'axios';
import { Button } from 'react-bootstrap';
import React, { Component } from 'react';
import { canAccessPage, currentUser, extractRole, jwtHeader } from '../../Utility/Constants';
import './AccountantDelegations.css';
import DelegationDetails from './DelegationDetails';
import Moment from 'react-moment';


class AccountantDelegations extends Component{

    constructor(props){
        
        super(props);
        canAccessPage(this.props, extractRole(window.location.pathname));
        this.state = {
            delegations: [],
            columnNames:{
                delegationNumber: "Delegation no",
                start: "Start",
                end: "End",
                sum: "Sum",
                advancePayment: "Status"
            }
        
        } 
        this.handleRedirect=this.handleRedirect.bind(this);
        

    }
    
    componentDidMount= () => {
        
        axios.get("/delegations/accountant/getall", jwtHeader())
        .then(response => {
            const tempdel = response.data;
            this.setState( {delegations:tempdel})
            console.log(this.state.delegations[0].delegationVerified)

            console.log(response.data)
        }).catch(error => {
            console.log(error.message);
        })
        document.title='All Delegations';

        
    };

    renderTableHeader = () => {
        return ( 
          <tr>  
        <th >
            {this.state.columnNames.delegationNumber.toUpperCase()}
        </th> 
        <th >
            {this.state.columnNames.start.toUpperCase()}
        </th> 
         <th >
            {this.state.columnNames.end.toUpperCase()}
        </th> 
        <th >
            {this.state.columnNames.sum.toUpperCase()}
        </th>
        <th >
            {this.state.columnNames.advancePayment.toUpperCase()}
        </th>
        <th>

        </th>
        </tr> 


        )
    }

  

    handleRedirect = (delegationNumber) =>  {
        this.props.history.push({ 
            pathname: '/accountantdelegations/details',
            state: delegationNumber
           });
    }

    renderTableRows = () => {
        return this.state.delegations.map(delegation => {
            return(
                <tr className="table-active" key={delegation.id}>
                    <td>{delegation.delegationNumber}</td>
                    <td> <Moment date={delegation.startDate} format="DD-MM-yyyy HH:mm"/></td>
                    <td><Moment date={delegation.endDate} format="DD-MM-yyyy HH:mm"/></td>
                    <td>{delegation.sum} zł</td>
                    <td>{delegation.delegationStatus.statusName.toUpperCase()}</td>
                    <td><Button variant="primary" onClick={ delegation => this.handleRedirect(delegation.id)}>Details</Button></td>
                </tr>
            )
        })
    }
    

    handleClick = () =>  {
        
        this.props.history.push(this.state.redirect);
            
        
    }
    

    render(){
        
        return (
            
                
        <div className="body-position">
           
 
            <table class="table table-dark">
                <thead>

                {this.renderTableHeader()}

                </thead>
                <tbody>

                {this.renderTableRows()}
       
    
                </tbody>
                </table>

        </div>
        
        
       
      
        );
            
   
         

    
}
}



export default  AccountantDelegations;
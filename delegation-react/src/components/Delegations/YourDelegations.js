import axios from 'axios';
import { Button } from 'react-bootstrap';
import React, { Component } from 'react';
import { canAccessPage, currentUser, extractRole, jwtHeader } from '../../Utility/Constants';
import './YourDelegations.css';
import DelegationDetails from './DelegationDetails';
import Moment from 'react-moment';


class YourDelegations extends Component{

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
            },
            redirect:"yourdelegations/new"
        
        } 
        this.handleRedirect=this.handleRedirect.bind(this);
        

    }
    
    componentDidMount= () => {
        
        axios.get("/delegations/worker/getforuser/" + currentUser(), jwtHeader())
        .then(response => {
            const tempdel = response.data;
            this.setState( {delegations:tempdel})
            console.log(this.state.delegations[0].delegationVerified)

            console.log(response.data)
        }).catch(error => {
            console.log(error.message);
        })
        document.title='Your Delegations';

        
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
        console.log(delegationNumber)
        this.props.history.push({ 
            pathname: '/yourdelegations/details/'+delegationNumber,
            
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
                    <td><Button variant="primary" className="buttonnn" onClick={event => this.handleRedirect(delegation.delegationNumber)}>Details</Button></td>
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
           <button className="add-button" onClick={this.handleClick}>New</button>
 
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



export default  YourDelegations;
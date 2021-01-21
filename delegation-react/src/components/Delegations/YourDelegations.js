import axios from 'axios';
import { Button } from 'react-bootstrap';
import React, { Component } from 'react';
import { canAccessPage, currentUser, extractRole, jwtHeader } from '../../Utility/Constants';
import './YourDelegations.css';
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
                advancePayment: "Paid"

            }
        
        } 
        
        

    }
    
    componentDidMount= () => {
        axios.get("/delegations/getforuser/" + currentUser())
        .then(response => {
            console.log("current user" + currentUser() + "reponse data " + response.data) 
            const tempdel = response.data;
            console.log(tempdel)
            this.setState( {delegations:tempdel})
            console.log("columnNames " + this.state.columnNames.delegationNumber)
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

    renderTableRows = () => {
        return this.state.delegations.map(delegation => {
            return(
                <tr className="table-active" key={delegation.id}>
                    <td>{delegation.delegationNumber}</td>
                    <td>{delegation.startDate}</td>
                    <td>{delegation.endDate}</td>
                    <td>{delegation.sum}</td>
                    <td>{delegation.advancePayment}</td>
                    <Button className="details-button">Details</Button>
                </tr>
            )
        })
    }

    render(){
        const{delegations} = this.state
        return delegations.length > 0 
        ? (
                <body className="body-position">
                         <button className="add-button">New</button>
            <table class="table table-dark">
                <thead>
                
                    {this.renderTableHeader()}
                
                </thead>
                <tbody>
                    {/* <tr class="table-active"> */}

                        {this.renderTableRows()}
                        
                     {/* </tr> */}
                </tbody>
            </table>
                
                </body>
        ):(
            <div>no users</div>
        )
            
   
         

    }
}

export default YourDelegations;
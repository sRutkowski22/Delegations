import React, { Component } from 'react';

import { canAccessPage, extractRole } from '../../Utility/Constants';

import './YourDelegations.css';

class YourDelegations extends Component{

    constructor(props){
        
        super(props);
        canAccessPage(this.props, extractRole(window.location.pathname));

    }
    componentDidMount(){
        
        document.title='Your Delegations';
        
    }

    render(){
        return(
            <body className="body-position">
                
            <button className="add-button">New</button>
            
            <table class="table table-dark">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                </tr>
                </thead>
                <tbody>
                    <tr class="table-active">

                    </tr>
                    <tr>

                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td colspan="2" class="table-active">Larry the Bird</td>
                        <td>@twitter</td>
                     </tr>
                </tbody>
            </table>
          </body>
        )

    }
}

export default YourDelegations;
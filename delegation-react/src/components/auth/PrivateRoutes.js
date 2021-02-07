

// Components

import AccountantDelegations from "../Delegations/AccountantDelegations"
import AddDelegation from "../Delegations/AddDelegation"
import CheckRoute from "../Delegations/CheckRoute"
import DelegationDetails from "../Delegations/DelegationDetails"
import YourDelegations from "../Delegations/YourDelegations"
import Roles from "./Roles"


// TODO:
/*
* 1. Make title optional
* 2. Make title multi type support ie: (string, node, react element)
* */

export default  [
 {
    component: YourDelegations,
    path: '/yourdelegations',
    exact: true,
    role: Roles.WORKER
 },
 {
     component: CheckRoute,
     path: 'checkroute',
     exact: true,
     role: Roles.ACCOUNTANT
 },
 {
    component: AddDelegation,
    path: '/yourdelegations/new',
    exact: true,
    role: Roles.WORKER
},
{
    component: DelegationDetails,
    path: '/yourdelegations/details/:id',
    exact: true,
    role: Roles.WORKER
},
{
    component: AccountantDelegations,
    path: '/alldelegations',
    exact: true,
    role: Roles.ACCOUNTANT
}
 
]


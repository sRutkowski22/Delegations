

// Components

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
 }
 
]


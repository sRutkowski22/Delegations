import {Component, React} from 'react';
import './Home.css'

class Home extends Component{

    componentDidMount(){
    document.title="Home"
    }

    
    render(){
        return(
            <div className="home-images">
                <img  src="delegation.jpg"/>
            </div>
        );

        
    }
    
}

export default Home;
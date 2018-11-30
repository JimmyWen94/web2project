import React, { Component } from 'react';
import logo from '../img/social-network-icon.png';

class WebsiteInfo extends Component {
    constructor(props) {
       super(props);
       this.state = {
  
       };
}
 

    render() {

       return (
           <div>
               <img src={logo} className="App-logo" alt="logo" />
               <br/>
               <p className="infoIntro">
                   Welcome to ActiveSocial, you can create and join the activity
                   on top of the menu bar.
               </p>
           </div>
       );
    
    }
}
 
export default WebsiteInfo;
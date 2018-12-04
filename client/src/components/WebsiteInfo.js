import React, { Component } from 'react';
import logo from '../img/social-network-icon.png';
import {Carousel} from 'react-bootstrap';

class WebsiteInfo extends Component {
    constructor(props) {
       super(props);
       this.state = {
  
       };
}
 

    render() {
        let imgUrl = 'http://localhost:3001/public/assets/images/caro1.png'
       return (
           <div>
               <img src={logo} className="App-logo" alt="logo" />
               <br/>
               {/* <p className="infoIntro">
                   Welcome to ActiveSocial, you can create and join the activity
                   on top of the menu bar.
               </p> */}
                <Carousel>
                <Carousel.Item>
                <img alt="intro_background" src={imgUrl} />
                <Carousel.Caption>
                <h3>Hello!</h3>
                <p>Welcome to ActiveSocial.</p>
                </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <img alt="intro_background" src={imgUrl} />
                <Carousel.Caption>
                <h3>Join</h3>
                <p>Join the Activity you like!</p>
                </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <img alt="intro_background" src={imgUrl} />
                <Carousel.Caption>
                <h3>Create</h3>
                <p>Create the Activity you want!</p>
                </Carousel.Caption>
                </Carousel.Item>
                </Carousel>
           </div>
       );
    
    }
}
 
export default WebsiteInfo;
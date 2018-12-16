import React, { Component } from 'react';
// import {Button, Glyphicon} from 'react-bootstrap'; 
import Layout from '../chatComponents/Layout';
import '../chat.css';

class Help extends Component {
    constructor(props) {
       super(props);
       this.state = {

       };
    }
 

    render() {

       return (
           <div>
               <Layout />
           </div>
       );
    
    }
}
 
export default Help;
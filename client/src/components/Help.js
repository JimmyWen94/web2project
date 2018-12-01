import React, { Component } from 'react';
import {Button, Glyphicon} from 'react-bootstrap'; 
class Help extends Component {
    constructor(props) {
       super(props);
       this.state = {
         data: []
       };
    }
 

    render() {

       return (
           <div>
               <div className='HelpInfo'>
                 <div className='help_advice'>
                 <Button className='help_advice'>
                        <Glyphicon glyph='envelope' /> Give Advices
                 </Button>
                 </div>

                 <div className='help_report'>
                 <Button className='help_report'>
                     <Glyphicon glyph='warning-sign'/> Report Users
                 </Button>
                 </div>
                 <div className='help_report'>
                 <Button className='help_report'>
                     <Glyphicon glyph='warning-sign'/> Report Web Problems
                 </Button>
                 </div>
                 
               </div>
           </div>
       );
    
    }
}
 
export default Help;
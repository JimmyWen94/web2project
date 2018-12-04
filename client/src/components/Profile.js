import React, { Component } from 'react';
import axios from "axios";
import wzimg from "../img/userIMG/weizhang.jpg";

import {Button, Glyphicon} from 'react-bootstrap'; 
import {Grid, Row, Col} from 'react-bootstrap';
class Profile extends Component {
    constructor(props) {
       super(props);
       this.state = {
         data: [],
         id: String,
         fName: String,
         LName: String,
         photo: String,
         intro: String,
         enroll_ev: [],
         safe_mode: String
       };
    }
 
    componentDidMount() {
        this.getDataFromDb();
    }

    // componentWillUnmount() {
    //     if (this.state.intervalIsSet) {
    //       clearInterval(this.state.intervalIsSet);
    //       this.setState({ intervalIsSet: null });
    //     }
    // }

    async getDataFromDb() {
        try {
          const response = await axios.get('http://localhost:3001/api/users/1a2cbe1c-20d1-409c-9e09-bccaaf2d995d',{crossdomain:true});
        //   console.log(response);
          this.setState({
              data:response.data,
              id: response.data.id,
              fName: response.data.fName,
              LName: response.data.LName,
              photo: response.data.photo,
              intro: response.data.intro,
              enroll_ev: response.data.enroll_ev,
              safe_mode: response.data.safe_mode
            });
            
        } catch (e) {
          console.log(e);
        }
      };
    render() {

        // let imgSrc = "http://localhost:3001/public/assets/images/userIMG/" + this.state.photo;
        const {data} = this.state;
        // console.log(data.enroll_ev);
        //check Tv-MAZE
        let currentEvElement = this.state.enroll_ev.map(ev => 
            <li className='li_pro_ev' key = {ev.eventId}>
            {ev.title} 
            <br/>
            Date: {ev.date} @ {ev.time} 
            </li>
        );
        
        return (
        
           <div className='pro_back'>
               <div className='pro_before_ev'>
                <p className='Profile'>
                <img src={wzimg} className="userImage" alt="logo" />
                </p>
               
               
                <p className='pro_name'>
                    {data.fName} {data.LName}
                    <Button className='pro_setting'>
                        <Glyphicon glyph='cog' />
                    </Button>
                </p>

                <p className='pro_intro'>
                    {data.intro}
                </p>
                <p className='pro_ev_title'>
                    Enrolled Event <Glyphicon glyph='arrow-down'/>
                </p>
                </div>
                <Grid>
                    <Row>
                    <Col sm={4} md={4}></Col>
                        <Col sm={4} md={4}>
                <p className='pro_ev_list'>
                    {currentEvElement}
                </p>
                </Col>
                </Row>
                </Grid>
           </div>
       );
    
    }
}
 
export default Profile;
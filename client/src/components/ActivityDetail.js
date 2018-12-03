import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import {Button, Glyphicon, Media} from 'react-bootstrap'; 
import { LinkContainer } from 'react-router-bootstrap';

import { Route, Switch } from 'react-router-dom';
class ActivityDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            id: String,
            type: String,
            place: String,
            date: String,
            time: String,
            description: String,
            creator: String,
            enroll: [],
            safe: String,
            ListDiv: [],
            DetailDiv: []
        }
    }

    componentDidMount() {
        this.getDataFromDb();
    }

    async getDataFromDb() {
        try {
           let url = 'http://localhost:3001/api/events/' + this.props.match.params.id;
           let response = await axios.get(url ,{crossdomain:true});
           this.setState({
              data: response.data,
              id: response.data._id,
              type: response.data.type,
              place: response.data.place,
              date: response.data.date,
              time: response.data.time,
              description: response.data.description,
              creator: response.data.creator,
              enroll: response.data.enroll,
              safe: response.data.safe,
           });
           this.createActList();
           this.createActDetail();
        } catch(e) {
           console.log(e);
        }
    }

    async createActList() {
        try {
            let url = 'http://localhost:3001/api/users/' + this.state.creator;
            let response = await axios.get(url ,{crossdomain:true}); 
            let fName = response.data.fName;
            let LName = response.data.LName;
            let fullName = fName + LName;
            let imgUrl = 'http://localhost:3001/public/assets/images/userIMG/' + fullName + ".png";
            let enrollNum = this.state.enroll.length;
            let enrollDiv;
            if (enrollNum === 0) {
                enrollDiv = <p>No one has joined this event yet!</p>
            } else if (enrollNum === 1) {
                enrollDiv = <p>{enrollNum} user has joined this event!</p>
            } else {
                enrollDiv = <p>{enrollNum} users has joined this event!</p>
            }
            let creatorDiv = <div>
                Creator <br/>
                <img className="actD_creatorimg" src={imgUrl} width='125px' height='125px' alt='creatorimg'></img>
                <p className='actD_creatorname'>{fName} {LName}</p>
                <div className='actD_enrollnum'>{enrollDiv}</div>
            </div>
            this.setState({ListDiv:creatorDiv});
        } catch(e) {
            console.log(e);
        }
    }

    async createActDetail() {
        let imgUrl = 'http://localhost:3001/public/assets/images/actIMG/' + this.state.type + ".png";
        // console.log(imgUrl);
        let act_detail = <div className='actD_info'>
        <Media>
        <Media.Left>
        <img className="actD_evimg" src={imgUrl} width='250px' height='250px' alt='userimg'></img>
        </Media.Left>
        <Media.Body>
        <Media.Heading>{this.state.title}</Media.Heading>
        <p>{this.state.place}</p>
        <p>{this.state.date} @ {this.state.time}</p>
         <br />
         <p className="actD_description">{this.state.description}</p>
        </Media.Body>
        </Media>
        
        </div>
        this.setState({DetailDiv:act_detail});
    }

    handleClick() {
        alert('Successfully Join the Event!');
    }
    render() {
        // let id = this.props.match.params.id
        let {data} = this.state;

        return (
            <div>
                {this.state.DetailDiv}
                
                <div className='actD_creator_wrap'>
                {this.state.ListDiv}
                </div>
                <div className='actD_button_wrap'>
                <Button className='actD_button_join' onClick={this.handleClick}><Glyphicon glyph='plus' />Join Now</Button>
                <LinkContainer className='actD_linkC' to='/activity'>
                <Button><Glyphicon glyph='chevron-left' />Back to List</Button>
                </LinkContainer>
                
                </div>
            </div>
        )
    }//render end
}// class end

export default ActivityDetail;
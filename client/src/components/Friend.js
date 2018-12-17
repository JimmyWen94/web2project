import React, { Component } from "react";
import axios from "axios";
import { Media } from 'react-bootstrap';
import {Button} from 'react-bootstrap'; 


class Friend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fName: "",
            LName: "",
            intro: "",
        }
        this.getFriend = this.getFriend.bind(this);
    }
    async getFriend(id) {
        let url = "http://localhost:3001/api/users/" + id;
        let response = await axios.get(url);
        this.setState({
            fName: response.data.fName,
            LName: response.data.LName, 
            intro: response.data.intro});
    }
    
    componentDidMount() {
        console.log(this.props);
        this.getFriend(this.props.id);
    }
    render() {
        let {fName, LName, intro} = this.state;
        let fullName = fName + LName;
        let imgUrl = 'http://localhost:3001/public/assets/images/userIMG/' + fullName + ".png";
        return(
            <div className='fr_list_wrap' key={fullName}>
        <Media>
        <Media.Left>
        <img className="fr_userimg" src={imgUrl} width='250px' height='250px' alt='userimg'></img>
        </Media.Left>
        {/* <span className='fr_list_name'>{fName} {LName}</span> */}
           <Media.Body>
           <Media.Heading>{fName} {LName}</Media.Heading>
           <br/>
           <br/>
           <br/>
           <p>{intro}</p>
           {this.props.isFriend === true ? 
           <Button bsStyle="danger" className='fr_bar_plus' onClick={this.props.unfollowFriend}>Unfollow</Button> :
           <Button bsStyle="success" className='fr_bar_plus' onClick={this.props.follow}>Follow</Button> }
           </Media.Body>
        </Media>
        </div> //wrap end
        )
    } 
}

export default Friend;
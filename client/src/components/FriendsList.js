import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import {Button, Glyphicon} from 'react-bootstrap'; 
//import {FormControl, FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap';
import {followFriend, unfollowFriend, getFriends} from "./actionCreater";
import { connect } from "react-redux";
import Friend from "./Friend";

class FriendsList extends Component {
   constructor(props) {
      super(props);
      this.redirectToFriendsSearch = this.redirectToFriendsSearch.bind(this);
      this.searchHandler = this.searchHandler.bind(this);
   }

   componentDidMount() {
      this.props.getFriends();
   }
   unfollowFriend(id) {
      this.props.unfollowFriend(id);
      alert("Unfollow Successly");
      this.props.history.push("/friends");
   }
   searchHandler(event) {
      this.setState({friend: event.target.value});
   }
   
   redirectToFriendsSearch = () => {
      this.props.history.push("/friends/search");
   }

   render() {
      // const {data} = this.state;
      let friendTitle;
      // let listDiv;
      if (this.props.friends.length === 0) {
         friendTitle = <p>You does not have any friend yet!</p>
      } else {
         friendTitle= <p>You have {this.props.friends.length} friends!</p>
      }
      // let searchBar = <form>
      // <FormGroup
      //   controlId="formBasicText"
      // //   validationState={this.getValidationState()}
      // >
      //   <ControlLabel>Searching Your Friends Here</ControlLabel>
      //   <FormControl
      //     type="text"
      //    //  value={this.state.value}
      //     placeholder="Enter text"
      //     onChange={this.searchHandler}
      //   />
      //   <FormControl.Feedback />
      //   <HelpBlock>Friend matched will automatically shows below.</HelpBlock>
      // </FormGroup>
      // </form>
      console.log(this.props.friends);
      let friends = this.props.friends.map(fr => (
         <Friend 
            key={fr.friendId}
            id={fr.friendId}
            unfollowFriend={this.unfollowFriend.bind(this, fr.friendId)}
            isFriend={true}
         />
      ))
      
      return (
         <div>
             <div className='fr_top_wrap'>
             <div className='fr_bar'>
             <Button bsStyle="primary" className='fr_bar_plus' onClick={this.redirectToFriendsSearch}>
             <span >
                <Glyphicon glyph='plus' />Find New Friend
             </span>
             </Button>
             {/* <Grid className='actL_searchGrid'>
               <Row>
               <Col sm={6} md={12}>
               {searchBar}
               </Col>
               </Row>
            </Grid> */}
             <br />
             
             </div>
             {friendTitle}
             </div>
             {friends}
             
             
            <Switch> 
               
            </Switch>
         </div>
      );
   }
}

function mapStateToProps(reduxState) {
   return {
     friends: reduxState.friends
   };
 }
 
export default connect(mapStateToProps, { followFriend, unfollowFriend, getFriends })(
   FriendsList
 );
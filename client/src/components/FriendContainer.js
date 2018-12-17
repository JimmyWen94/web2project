import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import FriendsList from "./FriendsList";
import NewFriends from "./NewFriends";

class FriendContainer extends Component {
   render() {
      return (
         <div>
            <Switch>
               <Route exact path="/friends" component={FriendsList}/>
               <Route path="/friends/search" component={NewFriends} />
            </Switch>
         </div>
      )
   }
}

export default FriendContainer;
import React, {Component} from "react";
import {followFriend, unfollowFriend, getFriends, getUsers} from './actionCreater';
import { connect } from "react-redux";
import Friend from "./Friend";

class NewFriends extends Component {
    componentDidMount() {
        this.props.getUsers();
        this.props.getFriends();
    }
    follow(id) {
        this.props.followFriend(id);
        alert("Follow Successfully");
        this.props.history.push("/friends/search");
    }
    render() {
        let newFriends = [];
        let users = this.props.users;
        let friends = this.props.friends;
        if (friends.length === 0) {
            for (let user of users) {
                newFriends.push(user._id);
            }
        } else {
            let allFriendsId = new Set();
            for (let friend of friends) {
                allFriendsId.add(friend.friendId);
            }
            for (let user of users) {
                if (!allFriendsId.has(user._id)) {
                    newFriends.push(user._id);
                }
            }
        }
        //console.log(newFriends);
        let friendList = newFriends.map(id => (
            <Friend 
                key={id}
                id={id}
                follow={this.follow.bind(this, id)}
                isFriend={false}
            />
        ))
        return (
            <div>
                {friendList}
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    return {
      friends: reduxState.friends,
      users: reduxState.users
    };
  }
  
export default connect(mapStateToProps, { followFriend, unfollowFriend, getFriends, getUsers })(
    NewFriends
);
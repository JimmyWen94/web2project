import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from "axios";

class FriendContainer extends Component {
   constructor(props) {
      super(props);
      this.state = {
        data: [],
        friendsList: [],
        friendNum: 0,
        ListDiv: [], 
        currentFriendElement: undefined
      };
   }

   componentDidMount() {
      this.getDataFromDb();
   }

   async getDataFromDb() {
   try {
     const response = await axios.get('http://localhost:3001/api/users/1a2cbe1c-20d1-409c-9e09-bccaaf2d995d',{crossdomain:true});
   //   console.log(response);
     this.setState({
         data:response.data,
         friendsList:response.data.friends
     });
   //   console.log(this.state.friendsList)
   //   console.log(this.state.friendsList.length);   
     this.setState({friendNum: this.state.friendsList.length});
   //   console.log(this.state.friendNum);
     if (this.state.friendNum > 0) {
      let setDiv = this.state.friendsList.map(function(friendObj){
         let url = "http://localhost:3001/api/users/" + friendObj.friendId;
         let friendInfo = this.setListDiv(url);
         let lastName = friendInfo.fName;
         let firstName = friendInfo.LName;
         return <li>{lastName} {firstName}</li>
      })
      this.setState({ListDiv:setDiv});
     }
   } catch (e) {
     console.log(e);
   }
   }; //getData end

   async setListDiv(url) {
      let info;
      try {
         info = await axios.get(url,{crossdomain:true});
         console.log(info);
      } catch (e) {
         console.log(e);
      }
      return info;
   }

   render() {
      const {data} = this.state;
      let friendTitle;
      if (this.state.friendNum == 0) {
         friendTitle = <p>You does not have any friend yet!</p>
      } else {
         friendTitle= <p>You have {this.state.friendNum} friends!</p>
      }
      return (
         <div>
             {friendTitle}
             {data.ListDiv}

             
            <Switch> 
               
            </Switch>
         </div>
      );
   }
}

export default FriendContainer;
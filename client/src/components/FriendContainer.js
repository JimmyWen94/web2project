import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import axios from "axios";
import {Button, Glyphicon, Media} from 'react-bootstrap'; 
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
   //   0 friend test
   //   const response = await axios.get('http://localhost:3001/api/users/4d8ed553-43ae-44f2-af49-7f244f127c47',{crossdomain:true});
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

   //   if (this.state.friendNum > 0) {
   //    let setDiv = this.state.friendsList.map(function(friendObj){
   //       let url = "http://localhost:3001/api/users/" + friendObj.friendId;
   //       let friendInfo = this.setListDiv(url);
   //       let lastName = friendInfo.fName;
   //       let firstName = friendInfo.LName;
   //       return <li>{lastName} {firstName}</li>
   //    })
   //    this.setState({ListDiv:setDiv});

   //   }
      if (this.state.friendNum >= 1) {
         // console.log("Setting friend List ...");
         this.createFriendList();
      }
   } catch (e) {
     console.log(e);
   }
   } //getData end

   async createFriendList() {
      let tempDiv = [];
      let response;
         for (let i = 0; i < this.state.friendNum; i++) {
            let url = "http://localhost:3001/api/users/" + this.state.friendsList[i].friendId;
            // console.log(url);
            response = await axios.get(url,{crossdomain:true});
            // let photo = response.data.photo;
            let fName = response.data.fName;
            let LName = response.data.LName;
            let fullName = fName + LName;
            let intro = response.data.intro;
            // console.log(fName + " " + LName);
            // console.log(i);
            let imgUrl = 'http://localhost:3001/public/assets/images/userIMG/' + fullName + ".png";
            let current = <div className='fr_list_wrap' key={fullName}>
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
               </Media.Body>
            </Media>
            </div>; //wrap end
            tempDiv.push(current);
         }
         this.setState({ListDiv:tempDiv})
   }
   // async setListDiv(url) {
   //    let info;
   //    try {
   //       info = await axios.get(url,{crossdomain:true});
   //       console.log(info);
   //    } catch (e) {
   //       console.log(e);
   //    }
   //    return info;
   // }

   render() {
      // const {data} = this.state;
      let friendTitle;
      let listDiv;
      if (this.state.friendNum === 0) {
         friendTitle = <p>You does not have any friend yet!</p>
      } else {
         friendTitle= <p>You have {this.state.friendNum} friends!</p>
         listDiv = this.state.ListDiv;
      }
      return (
         <div>
             <div className='fr_top_wrap'>
             <div className='fr_bar'>
             <Button bsStyle="primary" className='fr_bar_plus'>
             <span >
                <Glyphicon glyph='plus' />Add Friend
             </span>
             </Button>
             <Button bsStyle='danger'>
             <span className='fr_bar_remove'>
                <Glyphicon glyph='remove' />Unfriend
             </span>
             </Button>
             <br />
             
             </div>
             {friendTitle}
             </div>

             {listDiv}
             
             
            <Switch> 
               
            </Switch>
         </div>
      );
   }
}

export default FriendContainer;
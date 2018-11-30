import React, { Component } from 'react';
import axios from "axios";
import wzimg from "../img/userIMG/weizhang.jpg";
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
          console.log(response);
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
        return (
        
           <div>
               
                <p className='Profile'>
                <img src={wzimg} className="userImage" alt="logo" />
                </p>
               
               
                <p className='pro_name'>
                    {data.fName} {data.LName}
                </p>
                <p className='pro_intro'>
                    {data.intro}
                </p>
               
           </div>
       );
    
    }
}
 
export default Profile;
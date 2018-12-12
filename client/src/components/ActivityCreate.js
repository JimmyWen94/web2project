import React, { Component } from 'react';
import axios from 'axios';
import {Button, Glyphicon, Grid, Row, Col} from 'react-bootstrap'; 
import {ControlLabel, FormGroup, FormControl, HelpBlock} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class ActivityCreate extends Component {
    constructor(props, context) {
       super(props, context);
       this.state = {
            CreateForm:[],
            data: [],
            title: '',
            type:'',
            place:'',
            date:'',
            time:'',
            description:'',
            creator:'', //current is origin
            safe:'' //curent is 1
       };
       
    }

    componentDidMount() {
        this.createForm();
    }

    handleChange(e) {
        let change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }
    
    handleSubmit = event => {
        event.preventDefault();
    
        
        // console.log(this.state.type);
        // console.log(this.state.title);
        // console.log(this.state.type);
        // console.log(this.state.place);
        // console.log(this.state.date);
        // console.log(this.state.time);
        // console.log(this.state.description);
        let postData = {
        title:this.state.title,
        type:this.state.type,
        place:this.state.place,
        date:this.state.date,
        time:this.state.time,
        description:this.state.description,
        creator:"1a2cbe1c-20d1-409c-9e09-bccaaf2d995d",
        safe:"1"
        };
        // postData.title = this.state.title;
        // postData.type = this.state.type;
        // postData.place = this.state.place;
        // postData.date = this.state.date;
        // postData.time = this.state.time;
        // postData.description = this.state.date;
        // postData.creator = "1a2cbe1c-20d1-409c-9e09-bccaaf2d995d";
        // postData.safe = "1";
        console.log(postData);
        let eventId;
        
        axios.post(`http://localhost:3001/api/events/`, postData)
        .then(res => {
            console.log(res);
            console.log(res.data);
            eventId = res.data._id;
            // creatorEvIdAdd(res.data);
            
            let EvData = res.data;
            let newEv = {
              eventId: EvData._id,
              title: EvData.title,
              date: EvData.date,
              time: EvData.time
            }

            let userId = "1a2cbe1c-20d1-409c-9e09-bccaaf2d995d";
            let fName = "Wei";
            let LName = "Zhang";
            let url = 'http://localhost:3001/api/users/' + userId + '/enroll_ev';
            
            axios.post(url, newEv);
            let urlEv = 'http://localhost:3001/api/events/' + eventId + '/enroll';
            let userD = {
              userId: userId,
              fName: fName,
              LName: LName
           }
           // console.log(userD);
           let response2 = axios.post(urlEv, userD).then(res => {
            console.log(response2)
            this.props.history.push(`/activity/${eventId}`);
           });
           
           
        })
        
        //currently has html error because it will render page first.
        
    }

    async creatorEvIdAdd(EvData) {

    }
    
    
    // getValidationState() {
    //     const length = this.state.value.length;
    //     if (length > 3) return 'success';
    //     // else if (length > 3) return 'warning';
    //     else if (length > 0) return 'error';
    //     return null;
    // }

    createForm() {
        function FieldGroup({ id, label, help, ...props }) {
            return (
              <FormGroup controlId={id}>
                <ControlLabel>{label}</ControlLabel>
                <FormControl {...props} />
                {help && <HelpBlock>{help}</HelpBlock>}
              </FormGroup>
            );
        }
    
        const formInstance = (
            <form onSubmit={this.handleSubmit}>
              <Grid>
              <Row className="show-grid">
              <Col sm={6} md={6}>
              <FieldGroup
                id="formControlsTitle"
                type="title"
                label="Title"
                placeholder="Enter Title"
                name="title"
                onChange={this.handleChange.bind(this)}
              />
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Type</ControlLabel>
                <FormControl componentClass="select" placeholder="select" name="type" type="type"      
                onChange={this.handleChange.bind(this)}>
                  <option value="select">Select one ...</option>
                  <option value="lge">Lanuge and Culture</option>
                  <option value="frm">Friend Making</option>
                  <option value="boa">Board Game</option>
                  <option value="mus">Musical Event</option>
                  <option value="spo">Sports</option>
                  <option value="oth">Others</option>
                </FormControl>
              </FormGroup>

              <FieldGroup
                id="formControlsPlace"
                type="place"
                label="Place"
                placeholder="1 Castle Point Terrace, Hoboken, NJ 07030"
                name='place'
                onChange={this.handleChange.bind(this)}
              />
              </Col>
              <Col sm={6} md={6}>
              <FieldGroup
                id="formControlsDate"
                type="date"
                label="Date"
                placeholder="MMM/DD/YY"
                name='date'
                onChange={this.handleChange.bind(this)}
              />
              <FieldGroup
                id="formControlsTime"
                type="time"
                label="Time"
                placeholder="Enter time"
                name='time'
                onChange={this.handleChange.bind(this)}
              />
     
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Description</ControlLabel>
                <FormControl componentClass="textarea" placeholder="More details of your event here ..." 
                type='description'
                name='description'
                onChange={this.handleChange.bind(this)}/>
              </FormGroup>

              {/* Missing safe and creator */}
              </Col>
              </Row>
              </Grid>
              <Button className='actC_button_submit' type="submit">Submit</Button>
            </form>

        ); //const end
        this.setState({CreateForm: formInstance});
    }



    
    render() {

        return (
          <div className="actC_body_wrap">
            <div className='actC_intro'> 
            <p>Create your own Activity Below</p>
            <LinkContainer className='actC_linkback' to='/activity'>
                <Button><Glyphicon glyph='chevron-left' />Back to List</Button>
            </LinkContainer>
            </div>
            {this.state.CreateForm}
            {/* <form onSubmit={this.handleSubmit}>
            <FormGroup
                controlId="formBasicText"
                validationState={this.getValidationState()}
            >
            
            <ControlLabel>Event title</ControlLabel>
            <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.handleChange}
            />
            <FormControl.Feedback />
            <HelpBlock>Provide at least 3 string length.</HelpBlock>
            <button type="submit">Add</button>
            </FormGroup>
            </form> */}
            
          </div>
        )
      }
}
 
export default ActivityCreate;
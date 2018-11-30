import React, { Component } from 'react';

import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
/*component import*/
import WebsiteInfo from './components/WebsiteInfo';
import ErrorPage from './components/ErrorPage';
import FriendContainer from './components/FriendContainer';
import ActivityContainer from './components/ActivityContainer';
import Profile from './components/Profile';
import Help from './components/Help';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <header className="App-header">
          <Navbar inverse collapseOnSelect className='navbar'>
            <Navbar.Header>
            <Navbar.Brand>
            {/* <a href="/">ActiveSocial</a> */}
            <Link className="main" to="/">
            ActiveSocial
            </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
            </Navbar.Header>

            <Navbar.Collapse>
            <Nav>
            <LinkContainer to="/friends">
            <NavItem eventKey={1}> 
            Friends
            </NavItem>
            </LinkContainer>
            
            <LinkContainer className="ActLink" to="/activity">
            <NavItem eventKey={2} >
            Activity
            </NavItem>
            </LinkContainer>
            </Nav>
            
            <Nav pullRight>
            <LinkContainer to="/profile">
            <NavItem eventKey={1}>
            Profile
            </NavItem>
            </LinkContainer>

            <LinkContainer to="/help">
            <NavItem eventKey={2}>
            Help
            </NavItem>
            </LinkContainer>
            </Nav>
          </Navbar.Collapse>
          </Navbar>
        </header>
        
        

        <div className="App-body">

        <Switch>
          <Route exact path="/" component={WebsiteInfo} />
          <Route path="/friends" component={FriendContainer} />
          <Route path="/activity" component={ActivityContainer} />
          <Route path="/profile" component={Profile} />
          <Route path="/help" component={Help} />
          <Route path="*" component={ErrorPage} />
        </Switch>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;

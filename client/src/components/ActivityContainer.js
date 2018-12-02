import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ActivityList from './ActivityList';
import ActivityDetail from './ActivityDetail';

class ActivityContainer extends Component {
   constructor(props) {
      super(props);
      this.state = {

      };
   }
   render() {
      return (
         <div>
             
            <Switch> 
            <Route path="/activity/" exact component={ActivityList} />
            <Route path="/activity/:id" exact component={ActivityDetail} />
            </Switch>
         </div>
      );
   }
}

export default ActivityContainer;
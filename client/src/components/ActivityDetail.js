import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class ActivityDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {

    }

    render() {
        let id = this.props.match.params.id
        return (
            <div>
            <p>Test {id}</p>

            </div>
        )
    }//render end
}// class end

export default ActivityDetail;
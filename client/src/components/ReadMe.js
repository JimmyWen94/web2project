import React, {Component} from 'react';
import Axios from 'axios';
import marked from 'marked';

export default class ReadMe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        };

        this.getMarkdownText = this.getMarkdownText.bind(this);
    }

    getMarkdownText() {
        const text = "This is a _Markdown_\n\n```//If you need any help please go to help community for help!```\n\n Hope you find your answers in the community~ \n\n \n\n If you have any suggestions for our excellent website, \n\n \n\n please contact sitzzzxxxwww@stevens.edu";

        var rawMarkup = marked(text, {sanitize: true});
        // var rawMarkup = marked(text, {sanitize: true});
        return { __html: rawMarkup };
    }

    render() {
        return (
            <div dangerouslySetInnerHTML={this.getMarkdownText()}> 
            </div>
        )
    }
}
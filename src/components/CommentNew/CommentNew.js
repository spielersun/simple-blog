import React, { Component } from 'react';
import axios from '../../axios';
import './CommentNew.css';

class PostNew extends Component {
    state = {
        title: '',
        content: ''
    }

    postDataHandler = () => {
        const data = {
            title: this.state.title,
            body: this.state.content
        };
        axios.post('comments/', data)
        .then(response => {
            console.log(response);
        });
    }

    render () {
        return (
            <div className="CommentNew">
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <button onClick={this.postDataHandler}>Add a Comment</button>
            </div>
        );
    }
}

export default PostNew;
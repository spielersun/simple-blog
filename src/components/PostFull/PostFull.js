import React, { Component } from 'react';
import axios from 'axios';
import './PostFull.css';
import Comment from '../Comment/Comment';

class PostFull extends Component {
    state = {
        loadedPost: null,
        error: false,
        comments: [],
        lastComment: 0
    }

    componentDidUpdate(){
        if (this.props.id){

            const commentsUrl = "posts/" + this.props.id + "/comments";

            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)){

                axios.get('posts/' + this.props.id)
                .then(response => {
                    this.setState({lastComment: 3});
                    this.setState({loadedPost: response.data});
                    axios.get(commentsUrl)

                    .then(response => {
                        const comments = response.data.slice(0, 3);
                        this.setState({comments: comments});
                    })
                })
                .catch(error => {
                    this.setState({error: true});
                });;
            }
        }
    }

    deletePostHandler = () => {
        axios.delete('posts/' + this.props.id)
            .then(response => {
                console.log(response);
            });
    }

    getCommentsHandler = () => {
        const commentsUrl = "posts/" + this.props.id + "/comments";

        axios.get(commentsUrl)
            .then(response => {
                const newQuantity = this.state.lastComment + 3;
                this.setState({lastComment: newQuantity});
                
                const commentsNew = response.data.slice(0, newQuantity);
                this.setState({comments: commentsNew});
            })
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        
        if(this.props.id){
            post = <p style={{textAlign: 'center'}}>Loading...</p>;
        }

        let comments = <p style={{textAlign:'center'}}>Something went wrong.</p>;
        
        if (!this.state.error){
            comments = this.state.comments.map(comment => {
                return <Comment 
                    key={comment.id} 
                    name={comment.name} 
                    body={comment.body} />;
            });
        };

        if(this.state.loadedPost){
            post = (
                <div className="PostFull">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p className="Content">{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="CommonButton" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                    <div className="Comments">
                        {comments}
                        <div className="SpawnMore">
                            <button className="CommonButton" onClick={this.getCommentsHandler}>Load More</button>
                        </div>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default PostFull;
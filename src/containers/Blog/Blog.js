import React, { Component } from 'react';
import axios from '../../axios';
import PostMini from '../../components/PostMini/PostMini';
import PostFull from '../../components/PostFull/PostFull';
import PostNew from '../../components/PostNew/PostNew';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false,
        lastPost: 0
    }
    componentDidMount(){
        axios.get('posts')
            .then(response => {
                this.setState({lastPost: 10});
                const posts = response.data.slice(0, 10);

                this.setState({posts: posts});
                this.setState({selectedPostId: posts[0].id});
            })
            .catch(error => {
                this.setState({error: true});
            });
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }

    getPostsHandler = () => {
        axios.get('posts')
            .then(response => {
                const newQuantity = this.state.lastPost + 10;
                this.setState({lastPost: newQuantity});

                const postsNew = response.data.slice(0, newQuantity);
                this.setState({posts: postsNew});
            })
    }
    
    render () {
        let posts = <p style={{textAlign:'center'}}>Something went wrong.</p>;
        
        if (!this.state.error){
            posts = this.state.posts.map(post => {
                return <PostMini 
                    key={post.id} 
                    title={post.title} 
                    body={post.body.slice(0, 100)}
                    clicked={() => this.postSelectedHandler(post.id)} />;
            });
        };

        return (
            <div>
                <section className="SectionPost">
                    <PostFull id={this.state.selectedPostId} />
                </section>
                <section className="SectionNew">
                    <PostNew />
                </section>
                <section className="SectionAll">
                    {posts}
                    <div className="SpawnMore">
                        <button className="SpawnBig" onClick={this.getPostsHandler}>Load More</button>
                    </div>
                </section>
            </div>
        );
    }
}

export default Blog;
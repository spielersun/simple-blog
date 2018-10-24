import React from 'react';
import './Comment.css';

const comment = (props) => (
    <div className="Comment">
        <span className="Title">{props.name}</span>
        <p className="Message">{props.body}</p>
    </div>
);

export default comment;
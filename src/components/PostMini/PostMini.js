import React from 'react';
import './PostMini.css';

const postMini = (props) => (
    <article className="PostMini" onClick={props.clicked}>
        <h3>{props.title}</h3>
        <div className="Info">
            <div className="Text">{props.body}</div>
        </div>
    </article>
);

export default postMini;
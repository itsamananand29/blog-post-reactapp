import React from 'react';

import './Post.css';

const post = (props) => {
    // console.log(props)
    return(
    <article className="Post" >
        <h1>{props.title}</h1>
        <div className="Info">
            <div className="PostedOn">Posted on: { props.postedOn}</div>
            <img className="Image" src={props.imageUrl} alt="" onClick={props.clicked}/> 
            <div className="Author">Author: {props.author}</div>
            <button onClick={props.clicked}>Read More</button>

        </div>
    </article>)
};

export default post;
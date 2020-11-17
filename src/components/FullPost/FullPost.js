import axios from '../../axios_instance';
import React, { Component } from 'react';

import './FullPost.css';

class FullPost extends Component {
    state={
        loadedPost: null
    }
    componentDidMount(){
        // console.log(this.props)
     if(this.props.match.params.id){
         if(!this.state.loadedPost ||(this.state.loadedPost && this.state.loadedPost.id !== this.props.match.params.id) ){
            axios.get('/posts.json')
            .then(response=>{
                const post = response.data[this.props.match.params.id];
                this.setState({loadedPost:post})
                
            })
         }
     }   
     
    }
    updatePostHandler=()=>{
        this.props.history.push({pathname:'/edit-post/'+this.props.match.params.id})
    }
    deletePostHandler=()=>{
        
        axios.delete('/posts/'+this.props.match.params.id+'.json')
        .then(response=>{
            // console.log(response)
            this.props.history.goBack();
        });
        
        
    }
    goBackHandler=()=>{
        this.props.history.goBack();
    }
    render () {
        let post =null ;
        //= <p style={{textAlign:'center'}}>Loading Full-Post...</p>;
        let button ;
        if(this.props.id){
            post = <p>Loading...</p>;
        }
        
        
        if(this.state.loadedPost){
            if(this.state.loadedPost.userId === localStorage.getItem('userId')){
                button =( <div className="Edit">
                <button className="Update" onClick={this.updatePostHandler}>Edit</button>
                <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                </div>)
            }
            const timePosted=this.state.loadedPost.timePosted.toString().split('GMT')[0]
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p style={{fontSize:'12px'}}>Posted on: {timePosted}</p>
                    <img src={this.state.loadedPost.imageUrl} alt="" />
                    <p>{this.state.loadedPost.content}</p>
                    <br/>
                    {button} 
                    <button onClick={this.goBackHandler} >Back</button>
                </div>
    
            );
        }
        
        return post;
        
    }
}

export default FullPost;
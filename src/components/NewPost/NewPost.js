import axios from '../../axios_instance';
import React, { Component } from 'react';
import{Redirect} from 'react-router-dom';
import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        imageUrl:'',
        content: '',
        author: 'Max',
        submitted:false
    }
     
    addPostHandler=()=>{
        const post ={
            title : this.state.title,
            imageUrl:this.state.imageUrl,
            content:this.state.content,
            author:this.state.author,
            timePosted:Date(),
            userId:localStorage.getItem('userId')
        }
        axios.post('/posts.json',post)
        .then(response =>{ 
            // console.log(response)
            this.setState({submitted:true})
        })
    }
    render () {
        if(this.state.submitted){
            return (
                <Redirect to ='/'/>
            )
        }
        if(!localStorage.getItem('userId')){
            return <Redirect to = '/signin'/>
        }
        return (
            
            <div className="NewPost">
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Image Url</label>
                <input type="text" value={this.state.imageUrl} onChange={(event) => this.setState({imageUrl: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.addPostHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;
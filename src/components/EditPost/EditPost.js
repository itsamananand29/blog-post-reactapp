import axios from '../../axios_instance';
import React, { Component } from 'react';
import{Redirect} from 'react-router-dom';
import './EditPost.css';

class EditPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        submitted:false
    }
    componentDidMount(){
        if(this.props.match.params.id){
            if(!this.state.editPost ||(this.state.editPost && this.state.editPost.id !== this.props.match.params.id) ){
               axios.get('/posts/'+this.props.match.params.id+'.json')
               .then(response=>{
                   
                    this.setState({author:response.data.author,title:response.data.title,content:response.data.content})
                   
               })
            }
        }   
                
    }
    editPostHandler=()=>{
        const post ={
            title : this.state.title,
            content:this.state.content,
            author:this.state.author,
            timePosted:Date()
        }
        axios.put('/posts/'+this.props.match.params.id+'.json',post)
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
       
        return (
            
            <div className="NewPost">
                <h1>Edit Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.editPostHandler}>Edit Post</button>
            </div>
        );
    }
}

export default EditPost;
import React,{Component} from 'react';
import axios from '../../axios_instance';
import Post from '../../components/Post/Post'; 
import './Posts.css';
class Posts extends Component{
    state = {
        posts:[],
        auth:false
    }
    componentDidMount(){
        // console.log(this.props,"posts")
        this.setState({auth:this.props.location.state})
        axios.get('/posts.json')
        .then(response =>{
            if(!response.data){
                return 
            }
            const posts = Object.keys(response.data).map(postkey=>{
               return{postId:postkey,value:response.data[postkey]} 
            })


            this.setState({posts:posts})
            
        })
    }
    selectPostHandler =(postId) =>{
     this.props.history.push({pathname:'/'+postId})    
    }
    render(){
        const posts = this.state.posts.map(post=>{
            // console.log(post)
            const timePosted=post.value.timePosted.toString().split('GMT')[0]
            
            return(
                    <Post 
                        key ={post.postId}
                        title = {post.value.title} 
                        author = {post.value.author}
                        postedOn = {timePosted}
                        imageUrl={post.value.imageUrl}
                        clicked = {()=>this.selectPostHandler(post.postId)}
                        
                    />
                
        )})
        return (
        <section className="Posts">
            {posts}
        </section>)
        
    }

}
export default Posts;
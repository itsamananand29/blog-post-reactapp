import React,{Component} from 'react';
import axios from '../../axios_instance';
import Post from '../../components/Post/Post'; 
import './YourPosts.css';
class YourPosts extends Component{
    state = {
        posts:[],
        auth:false
    }
    componentDidMount(){
        // console.log(this.props,"posts")
        this.setState({auth:this.props.location.state})
        axios.get('/posts.json')
        .then(response =>{
            // console.log(response.data)
            if(!response.data){
                return 
            }
            const posts = Object.keys(response.data).map(postkey=>{
            //    console.log(response.data[postkey].userId=== localStorage.getItem('userId')) ;
                return {postId:postkey,value:response.data[postkey]};
                       
            })
            const yourposts=posts.filter(post=> post.value.userId === localStorage.getItem('userId'))


            this.setState({posts:yourposts})
            // console.log(this.state.posts)
        })
        .catch(err=>console.log(err))
    }
    selectPostHandler =(postId) =>{
     this.props.history.push({pathname:'/'+postId})    
    }
    render(){
        const posts = this.state.posts.map(post=>{
            console.log(post)
            
            const timePosted=post.value.timePosted.toString().split('GMT')[0]
            return(
                    <Post 
                        key ={post.postId}
                        title = {post.value.title} 
                        author = {post.value.author}
                        imageUrl={post.value.imageUrl}
                        postedOn = {timePosted}
                        clicked = {()=>this.selectPostHandler(post.postId)}
                        
                    />
                
        )})
        
        return (
        <section className="Posts">
            {posts.length>0?posts:<h1>You don't have any post yet</h1>}
        </section>)
        
    }

}
export default YourPosts;
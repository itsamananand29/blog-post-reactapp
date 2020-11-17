import React, { Component } from 'react';
import Posts from '../Posts/Posts';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import {Route,Link,NavLink,Switch} from 'react-router-dom';
import FullPost from '../../components/FullPost/FullPost';
import EditPost from '../../components/EditPost/EditPost';
import Auth  from '../Auth/Auth';
import Register from '../Auth/Register/Register';
import YourPosts from '../YourPost/YourPosts';
import Menu from '../../components/UI/Menu/Menu';
import SideBar from '../../components/UI/Sidebar/SideBar';
class Blog extends Component {
    state={
        displaySidebar:false
    }
    logoutHandler=(event)=>{
        // event.preventDefault()
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('expiresIn');
        
    }   
   openSidebar=()=>{
       this.setState({displaySidebar:true})
   } 
   closeSidebar=()=>{
        this.setState({displaySidebar:false})
   }
   
    render () {
        // let displayMenu =['Close'];
        // if(props.show){
        //     openSideBar=['SideBar','Open'];
        // }
        const pathlink = '/signin/your-post/'+localStorage.getItem('userId');
        return (
            <div className='Blog'>
                <header>
                    <nav>
                        <ul className='Mobilenav'>
                            <li className='Menu'><Menu  opened={this.openSidebar}/></li>
                            
                            {/* <li><NavLink to='/' className='Logo' exact ></NavLink></li> */}
                        </ul>
                        <ul className='Desktopnav'>
                            <li><NavLink to='/'exact>Home</NavLink></li>
                            {localStorage.getItem('userId') ?<li><NavLink to={pathlink} >Your Posts</NavLink></li>:null}
                            {localStorage.getItem('userId') ?<li><NavLink to='/new-post' exact>Add Post</NavLink></li>:null}
                            {!localStorage.getItem('userId') ?<li><NavLink to='/signin' exact>Login </NavLink></li>:
                            <li><Link to ='/'onClick={this.logoutHandler} exact>Logout</Link></li>}
                            {!localStorage.getItem('userId') ?<li><NavLink to='/signin/register' exact >Register</NavLink></li>:null} 
                        </ul>
                        
                    </nav>
                    
                    <SideBar show={this.state.displaySidebar} closed={this.closeSidebar}/>
                </header>
                {localStorage.getItem('userId') ?<NavLink className='Mobilenav' to='/new-post' exact>Add Post</NavLink>:
                <NavLink className='Mobilenav' to='/signin' exact>Sign In</NavLink>}
                {/* <button onClick={this.addPosthandler} className='Mobilenav'>Add Post</button> */}
                
                <Switch>
                    {!localStorage.getItem('userId') ?<Route path ='/signin' exact component ={Auth}/>:null}
                    <Route path ='/signin/register' exact component ={Register}/>
                    <Route path ='/new-post' exact component ={NewPost}/>
                    {localStorage.getItem('userId') ?<Route path ='/edit-post/:id' exact component ={EditPost}/>:null}
                    {localStorage.getItem('userId') ?<Route path ="/signin/your-post/:userId" exact component ={YourPosts} />:null}
                    <Route path ='/:id' exact component ={FullPost}/>
                    <Route path ="/" exact component ={Posts} />
                </Switch>
                
                
               
            </div>
        );
    }
}

export default Blog;
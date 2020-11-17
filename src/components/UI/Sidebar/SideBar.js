import React from 'react';
import BackDrop from '../BackDrop/BackDrop';
import {NavLink,Link} from 'react-router-dom'
import './SideBar.css';
const sideBar=(props)=>{
    // console.log('sidebar',props)
    let openSideBar =['SideBar','Close'];
    if(props.show){
        openSideBar=['SideBar','Open'];
    }
    // console.log(openSideBar.join(' '))
    const pathlink = '/signin/your-post/'+localStorage.getItem('userId');
    const logoutHandler=(event)=>{
        // event.preventDefault()
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('expiresIn');
        
    }   
    return(
    <div>    
        <BackDrop show={props.show} closed={props.closed}/>
        <div className={openSideBar.join(' ')} onClick={props.closed}>
            <nav>
                <NavLink to='/'exact>Home</NavLink>
                {localStorage.getItem('userId') ?<NavLink to={pathlink} >Your Posts</NavLink>:null}
                {/* {localStorage.getItem('userId') ?<NavLink to='/new-post' exact>Add Post</NavLink>:null} */}
                {!localStorage.getItem('userId') ?<NavLink to='/signin' exact>Login </NavLink>:null}
                {localStorage.getItem('userId') ?<Link to ='/'onClick={logoutHandler} exact>Logout</Link>:null}
                {!localStorage.getItem('userId') ?<NavLink to='/signin/register' exact>Register</NavLink>:null} 
            </nav>
        </div>
        </div>    
    )
};
export default sideBar;
import React from 'react'
import './styles/SideBar.css';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

function Sidebar() {

    const user = useSelector(selectUser);

    const returnItems = (topic)=>{
        return(
            <div className='sidebar_recentItem'>
            <span className='sidebar_hash'>#</span>
            <p>{topic}</p>
        </div>
        );
        
    }
  return (
    <div className='sidebar'>
        <div className='sidebar_top'>
            <img src='https://cdn.pixabay.com/photo/2016/08/13/17/59/background-1591229_960_720.jpg' alt=''></img>
            <Avatar src={user.photoUrl} className='sidebar_avatar'>{user.email[0]}</Avatar>
            <h2>{user.displayName}</h2>
            <h4>{user.email}</h4>

        </div>
        <div className='sidebar_stats'>
            <div className='sidebar_stat'>
                <p>Who viewed you</p>
                <p className='sidebar_number'>2456</p>
            </div>
            <div className='sidebar_stat'>
                <p>Views on post</p>
                <p className='sidebar_number'>2456</p>
            </div>
        </div>
        <div className='sidebar_bottom'>
            <p>Recent</p>
            {returnItems("ReactJs")}
            {returnItems("Devops")}
            {returnItems("Cloud Computing")}
            {returnItems("SpringBoot")}
            {returnItems("Developer")}

        </div>
    </div>
  )
}

export default Sidebar
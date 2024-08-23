import React from 'react'
import "./styles/Headeroptions.css"
import { Avatar } from '@mui/material';

function Headeroptions({avatar,Icon, title, onClick}) {
  return (
    <div onClick ={onClick} className='headeroptions'>
        {Icon&&<Icon className="headeroption_Icon"/>}
        {avatar && <Avatar src={avatar} >{title[0]}</Avatar>}
        
        <h3 className='headeroption_title'>{title}</h3>
    </div>
  )
}

export default Headeroptions;
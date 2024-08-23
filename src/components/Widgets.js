import React from 'react'
import { Info } from '@mui/icons-material'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import './styles/Widgets.css';
function Widgets() {
    const article = (heading,subtitle) =>(
        <div className="article">
            <div className="article-left">
                <FiberManualRecordIcon />
            </div>
            <div className="article-right">
                <h4>{heading}</h4>
                <p>{subtitle}</p>
            </div>
        </div>
    )
  return (
    <div className='widgets'> 
        <div className="widget_header">
            <h2>Linkedin News</h2>
            <Info />
        </div>
        {article('Paris Olympics 2024','Top News 9k readings')}
        {article('New icc chairman, Jai Shah','Top News 7k readings')}
        {article('Heavy rains in Hyderabad','Top News 7k readings')}
        {article('Read newspaper for more news','Top News everyday')}

    </div>
  )
}

export default Widgets
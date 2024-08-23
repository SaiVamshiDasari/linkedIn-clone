import React from 'react'
import './styles/InputOptions.css'

function InputOptions({Icon , title , color,onClick}) {
  
  return (


    <div  className='inputOptons' onClick={onClick}>
      
        
            <Icon style={{color:color}} />
            <h4 >{title}</h4>
          
        
      
        
    </div>
  )
}

export default InputOptions
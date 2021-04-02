import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card ,Icon,Title, Typography} from '@material-ui/core'
import Modal from './Modal'

function Dictonary(props) {
    const{dataValues}=props
    const[selectedword,setSelecetedword]=useState('')
    const[toggle,setToggle]=useState(false)
    

    const handleSelectedword=(word)=>{
        setSelecetedword(word)
        // setToggle(!toggle)
    }
   const handleToggle=()=>{
       setToggle(!toggle)
   }
    return (
        <div style={{backgroundColor:"ThreeDLightShadow"}}>
           <Typography style={{fontFamily:"serif",fontSize:50,color:"GrayText"}}>Words List</Typography>
            {
                dataValues.map((ele)=>{
                    return(
                        <Card onClick={()=>{
                            handleSelectedword(ele)
                            handleToggle()
                        }}  style={{width:500,height:50,padding:10,margin:20,border:"ridge",marginLeft:400,color:"WindowText",backgroundColor:"blanchedalmond"}}>
                        <Typography variant="h5" component="h2">{ele}</Typography>
                    </Card>
                    )
                   
                })
            }
        
         {toggle && <Modal word={selectedword} handleToggle={handleToggle} />} 
        </div>
    )
}

export default Dictonary

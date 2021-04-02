import React,{useState,useEffect} from 'react'
import {Button,Card, Typography,TextField} from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import axios from 'axios'
function AddWord(props) {
const[addWord,setAddWord]=useState('')
const{toggleAdd,handleAddWord}=props
    

const handleSubmit=(e,)=>{
e.preventDefault()
const data={
    "results":addWord
}
     axios.post(`https://cors-anywhere.herokuapp.com/https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${addWord}`,data, {
            headers: {
                'Access-Control-Allow-Origin':"https://cors-anywhere.herokuapp.com",
                "Accept": "application/json",
                'app_id': '7b4d8577',
                'app_key': 'cfd65bc2b074467aea4d91efa7cdeac2',
            }
        }).then((response) => {
            console.log(response.data);
            <Alert severity="success">Successfully Added </Alert>
        }).catch((err) => {
            alert(err.message)
        })
}
   
    

    const handleWord=(e)=>{
            setAddWord(e.target.value)
        }
    return (
                <div className='modal' onClick={handleAddWord} >
            <div className='modal-content'>
                <div className='modal-header'>
                    <h1>Add Word</h1>
                </div>
                <hr />
                <div className='modal-body'>   
                <form onSubmit={handleSubmit}  >
                <TextField id="standard-basic" label="Add" style={{width:400}} value={addWord} onChange={handleWord} onClick={toggleAdd}  />
                <Button variant="contained" color="default"  style={{marginLeft:20}} >Save</Button>
                </form>
                </div>
            </div>
        </div>
        
    )
}

export default AddWord

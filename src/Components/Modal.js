import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Modal(props) {
    const { word, toggle, handleToggle } = props
    const [definitions, setDefinitions] = useState([])
    useEffect(() => {
        axios.get(`https://cors-anywhere.herokuapp.com/https://od-api.oxforddictionaries.com/api/v2/words/en-gb?q=${word}`, {
            headers: {
                 'Access-Control-Allow-Origin':"https://cors-anywhere.herokuapp.com",
                "Accept": "application/json",
                'app_id': 'c2e7b1fe',
                'app_key': 'b41be5b3b08f91ebe3d849570f15c52a',
            }
        })
            .then((response) => {
                console.log(response.data)
                const result = response.data.results[0].lexicalEntries.find((ele) => ele.lexicalCategory.id === 'noun').entries[0].senses
                setDefinitions(result)
                console.log(result)
                // handleToggle()
                // console.log(Object.keys(result))
            })
    }, [word])
    const body = definitions.map((ele) => <li style={{ padding:10 }}>{ele.definitions}</li>)
    return (
        <div className='modal' onClick={handleToggle}>
            <div className='modal-content'>
                <div className='modal-header'>
                    <h1>{word.toUpperCase()}</h1>
                </div>
                <hr />
                <div className='modal-body'>
                    {body}
                </div>
            </div>
        </div>


    )
}

export default Modal

import { AppBar, Toolbar, Typography, InputBase, Icon,Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search'
// import {Icon} from '@material-ui/icons'
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { fade, makeStyles } from '@material-ui/core/styles';
import Dictonary from './Dictonary'
import AddWord from './AddWord'



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },

    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: '0',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(100),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

function Navbar() {
    const [words, setWords] = useState([])
    const [search, setSearch] = useState('')
    const [filterdata, setFilterdata] = useState([])
    const[toggleAdd,setToggleAdd]=useState(false)


    useEffect(() => {
        axios.get('https://cors-anywhere.herokuapp.com/https://od-api.oxforddictionaries.com/api/v2/domains/en-gb', {
            headers: {
                'Access-Control-Allow-Origin':"https://cors-anywhere.herokuapp.com",
                "Accept": "application/json",
                'app_id': '7b4d8577',
                'app_key': 'cfd65bc2b074467aea4d91efa7cdeac2',

            }
        }).then((response) => {
            const result = response.data
            console.log(result.results)
            setWords(Object.keys(result.results))
        }).catch((err) => {
            alert(err.message)
        })
    },[])
   const handleAddWord =()=>{
        setToggleAdd(!toggleAdd)
   }
    const handleSearchdata = (value) => {
        const result = words.filter((ele) => {
            return ele.toLowerCase().includes(value)
        })
        setFilterdata(result)
    }
    const handlesearch = (e) => {
        setSearch(e.target.value)
        handleSearchdata(e.target.value)
    }
    const classes = useStyles()
    return (

        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography >
                        Vocab
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            value={search} onChange={handlesearch}
                        />
                    </div>
                    <Button variant="contained" color="default"  onClick={()=>setToggleAdd(true)} style={{padding:5,marginLeft:100}}>Add</Button>
                </Toolbar>
            </AppBar>
            {
                search.length > 0 ? (
                    filterdata.length > 0 && <Dictonary dataValues={filterdata} />
                ) : (
                    <Dictonary dataValues={words} />
                )
            }
            {
                toggleAdd &&(<AddWord  toggleAdd={toggleAdd} handleAddWord={handleAddWord} />)
            }
        </div>
    )
}




export default Navbar

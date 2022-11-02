import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Collapse } from '@material-ui/core';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
 
const useStyles = makeStyles((theme) => ({
    root: {
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
       height: '100vh',
       fontFamily: 'Ubuntu'
    },
    appbar: {
       background: 'none',
    },
    appbarWrapper: {
        width: '80%',
        margin: '0 auto'
    },
    appbarTitle: {
        flexGrow: '1',
        color: '#fff',
    },
    container: {
        textAlign: 'center'
    },
    welcome: {
        color: '#fff',
        fontSize: '4rem'
    },
    info: {
        color: '#fff'
    },
    downArrow: {
        color: '#fff',
        fontSize: '5rem'
    }

}));
  
export default function Header() {
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    useEffect(()=>{
        setChecked(true);
    },[])
    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar className={classes.appbarWrapper}>
                    <h1 className={classes.appbarTitle}>Sentience</h1>
                </Toolbar>   
            </AppBar>
            <Collapse in={checked} {... (checked ? { timeout: 2000} : {})} collapsedHeight={50}>
                <div className={classes.container}>
                    <h1 className={classes.welcome}>
                        Welcome to <br /> Sentience
                    </h1>
                    <h2 className={classes.info}>
                        A course review experience backed by Sentiment Analysis
                    </h2>
                    <IconButton>
                        <KeyboardDoubleArrowDownIcon className={classes.downArrow}/>
                    </IconButton>
                </div>
            </Collapse>
        </div>
    )
}
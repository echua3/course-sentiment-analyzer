import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';
//import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
 
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
    }
}));
  
export default function Header() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar className={classes.appbarWrapper}>
                    <h1 className={classes.appbarTitle}>Sentience</h1>
                </Toolbar>   
            </AppBar>
            <div className={classes.container}>
                <h1 className={classes.welcome}>
                    Welcome to <br /> Sentience
                </h1>
                <h2 className={classes.info}>
                    A course review experience backed by Sentiment Analysis
                </h2>
                {/* <IconButton>
                    <KeyboardDoubleArrowDownIcon className={classes.downArrow}/>
                </IconButton> */}
            </div>
        </div>
    )
}
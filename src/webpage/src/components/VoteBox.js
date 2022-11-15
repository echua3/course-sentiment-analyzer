import React, { useState, useRef } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import ArrowDropUp from '@material-ui/icons/ArrowDropUp'
import Upvote from "./Upvote";
 
 
const useStyles = makeStyles((theme) => ({
 voteBox: {
   [theme.breakpoints.up('xs')]: {
     width: '4.5rem',
     fontSize: '2rem',
   },
   [theme.breakpoints.down('xs')]: {
     fontSize: '4.5rem',
     width: '3rem',
   },
   [theme.breakpoints.down(300)]: {
     fontSize: '1rem',
     width: '2rem',
   },
   [theme.breakpoints.down(200)]: {
     fontSize: '0.4rem',
     width: '1rem',
   },
 },
}))

 
const VoteBox = ({ review, votes, handleUpvote, handleDownvote }) => {
    const classes = useStyles()

    const [clickedUp, setClickedUp] = useState(0);
    // need to check if already upvoted/downvoted
    const [clickedDown, setClickedDown] = useState(0);
    let startingVotes = review.helpfulness;
    console.log("Starting Votes: ", startingVotes);
    const [currentVotes, setVotes] = useState(startingVotes);
    console.log("currentVotes after useState:", currentVotes);
    const stateRef = useRef();
    stateRef.current = currentVotes;
    stateRef.currentClickedUp = clickedUp;
    stateRef.currentClickedDown = clickedDown;

    if (!handleUpvote) {
        handleUpvote = () => { 
            if (clickedUp){
                // already upvoted, undo upvote
                setVotes(currentVotes - 1); 
                setClickedUp(false);
            } else if (clickedDown) {
                // already downvoted, undo downvote
                setVotes(currentVotes + 1); 
                setClickedDown(false);
            }
            else{
                // upvote
                setVotes(startingVotes + 1);
                setClickedUp(true);
            }
        };
    }
    console.log("votes: ", votes);
    console.log("clickedUp: ", clickedUp);

    if (!handleDownvote) {
        handleDownvote = () => { 
            if (clickedDown){
                // already downvoted, undo downvote
                setVotes(currentVotes + 1); 
                setClickedDown(false);
            } else if (clickedUp) {
                // already upvoted, undo upvote
                setVotes(currentVotes - 1);
                setClickedUp(false);
            }
            else{
                // downvote
                setVotes(startingVotes - 1);
                setClickedDown(true);
            }
        };
    }

 return (
   <Grid
     container
     direction="column"
     justify="flex-start"
     alignItems="center"
     className={classes.voteBox}
     data-testid="voteBox-container"
   >
     <IconButton onClick={handleUpvote} size="small" data-testid="upvote-button">
        {stateRef.currentClickedUp ? <ArrowDropUp className={classes.voteBox} style={{fill: "blue"}}/> : <ArrowDropUp className={classes.voteBox}/>}
     </IconButton>
     <Typography className={classes.votes} data-testid="voteBox-votes">
        {console.log("Inside return, currentvotes: ", currentVotes)}
        {stateRef.currentClickedUp || stateRef.currentClickedDown ? stateRef.current : startingVotes}
    </Typography>
     <IconButton onClick={handleDownvote} size="small" data-testid="downvote-button">
     {stateRef.currentClickedDown ? <ArrowDropDown className={classes.voteBox} style={{fill: "red"}}/> : <ArrowDropDown className={classes.voteBox}/>}
     </IconButton>
   </Grid>
 )
}
 
export default VoteBox
 

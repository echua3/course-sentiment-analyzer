import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import ArrowDropUp from '@material-ui/icons/ArrowDropUp'
import Upvote from './vote/Upvote'
import Downvote from './vote/Downvote'
import UndoUpvote from './vote/UndoUpvote'
import UndoDownvote from './vote/UndoDownvote'
 
 
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


 
const VoteBox = ({ review, votes, handleUpvote, handleDownvote, userUps, userDowns }) => {
    const classes = useStyles()
    const reviewID = review._id;

    const [clickedUp, setClickedUp] = useState(userUps && userUps.includes(reviewID) ? true: false);
    const [clickedDown, setClickedDown] = useState(userDowns && userDowns.includes(reviewID) ? true : false);

    const [currentVotes, setVotes] = useState(votes);

    const [userUpvotes, setUserUpvotes] = useState(userUps ? userUps : []);
    const [userDownvotes, setUserDownvotes] = useState(userDowns ? userDowns : []);

    if (!handleUpvote) {
        handleUpvote = () => { 
            if (clickedUp){
                // already upvoted, undo upvote
                setVotes(currentVotes - 1); 
                setClickedUp(false);
                // remove id from upvote list
                let result = userUpvotes.filter(item => item !== reviewID);
                setUserUpvotes(result);
                UndoUpvote(reviewID);
            } else if (clickedDown) {
                setVotes(currentVotes + 1); 
                setClickedDown(false);
                // remove id from downvote list
                let result = userDownvotes.filter(item => item !== reviewID);
                setUserDownvotes(result);
                UndoDownvote(reviewID);
            }
            else{
                // upvote
                setVotes(currentVotes + 1);
                setClickedUp(true);
                // add id to upvote list
                let result = [...userUpvotes, reviewID];
                setUserUpvotes(result); 
                // console.log("about to upvote review._id", reviewID);
                Upvote(reviewID); 
            }
        };
    }

    if (!handleDownvote) {
        handleDownvote = () => { 
            if (clickedDown){
                // already downvoted, undo downvote
                setVotes(currentVotes + 1); 
                setClickedDown(false);
                // remove id from downvote list
                let result = userDownvotes.filter(item => item !== reviewID);
                setUserDownvotes(result);
                UndoDownvote(reviewID);
            } else if (clickedUp) {
                // already upvoted, undo upvote
                setVotes(currentVotes - 1);
                setClickedUp(false);
                // remove id from upvote list
                let result = userUpvotes.filter(item => item !== reviewID);
                setUserUpvotes(result);
                UndoUpvote(reviewID);
            }
            else{
                // downvote
                setVotes(currentVotes - 1);
                setClickedDown(true);
                // add id to downvote list
                let result = [...userDownvotes, reviewID];
                setUserDownvotes(result); 
                Downvote(reviewID);
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
        {clickedUp ? <ArrowDropUp className={classes.voteBox} style={{fill: "blue"}}/> : <ArrowDropUp className={classes.voteBox}/>}
     </IconButton>
     <Typography className={classes.votes} data-testid="voteBox-votes">
        {currentVotes}
    </Typography>
     <IconButton onClick={handleDownvote} size="small" data-testid="downvote-button">
        {clickedDown ? <ArrowDropDown className={classes.voteBox} style={{fill: "red"}}/> : <ArrowDropDown className={classes.voteBox}/>}
     </IconButton>
   </Grid>
 )
}
 
export default VoteBox
 

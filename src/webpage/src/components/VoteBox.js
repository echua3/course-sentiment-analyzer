import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import ArrowDropUp from '@material-ui/icons/ArrowDropUp'
 
 
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
 
const VoteBox = ({ votes, handleUpvote, handleDownvote }) => {
 const classes = useStyles()
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
       <ArrowDropUp className={classes.voteBox} />
     </IconButton>
     <Typography className={classes.votes} data-testid="voteBox-votes">{votes}</Typography>
     <IconButton onClick={handleDownvote} size="small" data-testid="downvote-button">
       <ArrowDropDown className={classes.voteBox} />
     </IconButton>
   </Grid>
 )
}
 
export default VoteBox
 

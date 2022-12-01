import React from 'react';
import VoteBox from "./VoteBox";
import Grid from '@mui/material/Grid';
import { Comment } from "antd";
import './style/css/CourseComponent.scss';

const Review = ({review, handleUpvote, handleDownVote, userUps, userDowns}) => {

    return (
        <Grid
        container
        spacing={1}
        direction="row"
        alignItems="center"
        >
          <Grid item >
            <VoteBox 
            review={review} 
            handleUpvote={handleUpvote} 
            handleDownvote={handleDownVote} 
            votes={review.helpfulness}
            userUps={userUps}
            userDowns={userDowns}/>
          </Grid>
          <Grid item xs={10} md={9} >
            <Comment
              content = {
                  <><h6>
                  {review.comment}
                </h6><h4>
                    Difficulty: {review.difficulty}/5
                  </h4></>
              }
              datetime = {
                  <p>
                     {review.date && (new Date(review.date).toLocaleDateString())}
                  </p>   
              }
             
            />                     
          </Grid>

       </Grid>
    )
}

export default Review
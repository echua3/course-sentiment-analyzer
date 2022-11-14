import React from 'react';
import VoteBox from "./VoteBox";
import Grid from '@mui/material/Grid';
import { Comment } from "antd";
import { useState } from "react";
import './style/css/CourseComponent.scss';

const Review = ({review, handleUpvote, handleDownvote}) => {
    return (
        <Grid
        container
        spacing={1}
        direction="row"
        alignItems="center"
        >
          <Grid item >
            <VoteBox review={review._id} votes={review.helpfulness}/>
          </Grid>
          <Grid item xs={10} md={9} >
            <Comment
              content = {
                  <><h6>
                  {review.comment}
                </h6><h7>
                    Difficulty: {review.difficulty}/5
                  </h7></>
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
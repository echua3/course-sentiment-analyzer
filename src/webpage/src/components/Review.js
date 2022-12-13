import React from 'react';
import Helpfulness from './Helpfulness';
import Grid from '@mui/material/Grid';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Comment, Space } from "antd";
import './style/css/CourseComponent.scss';

const Review = ({review, handleUpvote, handleDownVote, userUps, userDowns}) => {

  function render(value) {
    return <span dangerouslySetInnerHTML={{__html: value}}></span>
  }

    return (
        <Grid
        container
        rowSpacing={0}
        direction="column"
        alignItems="left"
        >
          <Grid item xs={10} md={9} >
            <Comment 
              content = {
                  <><h6 Content-Type={'text/html'} charset='utf-8'>
                  {render(review.comment)}
                </h6><h4>
                    Difficulty: {review.difficulty}/5
                  </h4></>
              }
              datetime = {
                  <p>
                     {review.date && (new Date(review.date).toLocaleDateString())}
                  </p>   
              }
              avatar = {
                <Avatar size="small" icon={<UserOutlined />} />
              }
            /> 
          </Grid>
          <Grid item >
            <Helpfulness 
            review={review} 
            handleUpvote={handleUpvote} 
            handleDownvote={handleDownVote} 
            votes={review.helpfulness}
            userUps={userUps}
            userDowns={userDowns}/>
          </Grid>

       </Grid>
    )
}

export default Review
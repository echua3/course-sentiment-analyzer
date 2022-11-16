import React, { useContext } from "react";
import { useState } from "react";
import './style/css/CourseComponent.scss';
import Review from "./Review";
import axios from 'axios'

const ReviewView = ({ state, dispatch, review }) => {
    const { id } = useParams()
    const [user] = useContext(UserContext)

    const upvoteReview = async (questionId, commentId) => {
        try {
          const response = await axios.post(`${urls.questions}/${questionId}/${urls.comments}/${commentId}/${urls.likes}`, { likes: 1 }, config)
          return response.status === 200
        } catch (error) {
          console.log(error)
        }
        return false
      }

    const handleUpvoteReview = async (review) => {
        // if (!user) {
        //   setTimeout(() => dispatch(setErrorMessage('')), 5000)
        //   dispatch(setErrorMessage('you must be a logged in to upvote'))
        //   return
        // }
        const response = await questionService.upvoteReview(id, review.id)
        if (response) {
          let value = 1
          if (review.likes) {
            const userLikes = review.likes.filter((like) => like.likedBy === user.id)
            if (userLikes.length > 0) { // user already downvoted
              value = 2
            }
          }
    
          console.log(state.question.reviews)
          // update the reviews array
          const newReviews = state.question.reviews
          newReviews.forEach((questionReview) => {
            if (questionReview.id === review.id) {
              questionReview.likes.push({
                value,
                likedBy: user.id,
              })
            }
          })
    
          dispatch(setQuestion({
            ...state.question,
            Reviews: newReviews,
          }))
        } else {
          setTimeout(() => dispatch(setErrorMessage('')), 5000)
          dispatch(setErrorMessage('error: could not upvote'))
        }
      }
}

export default ReviewView
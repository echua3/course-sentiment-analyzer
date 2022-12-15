import React from "react";
import { useState, useEffect } from "react";
import './style/css/CourseComponent.scss';
import { Alert } from 'antd';
var Sentiment = require('sentiment');


function WriteReview({actualID, record, datasource}) {

    const [commentError, setCommentError] = useState("");
    const [commentErrorBoolean, showCommentError] = useState(false);

    var sentiment = new Sentiment();

    const [form, setForm] = useState({
        sectionID: {record}.record,
        comment: "",
        difficulty: 1,
        score: 1,
        helpfulness: 0,
        date: new Date(),
        userID: actualID
    });
    const [reviewSubmitted, setReview] = useState(false);

    function updateForm(value) {
        return setForm((prev) => {
          return { ...prev, ...value };
        });
    }

    async function enterReview(e) {

        e.preventDefault();
        var sentiment_score = sentiment.analyze(form.comment).score
        console.log(sentiment_score)

        setForm((prev) => {
          return { ...prev, sectionID: {record}.record,}})
        const newReview = { ...form };

        hideErrors();
        const spaceCheckComments = form.comment.replace(/\s/g, '');
        console.log(spaceCheckComments);
        if (spaceCheckComments.length < 1) {
          setCommentError("You need to add a review to you know your review!")
          showCommentError(true)
        } else if (spaceCheckComments.length < 10) {
          setCommentError("Please include at least 10 characters in your review!")
          showCommentError(true)
        }

        if(spaceCheckComments.length >= 10) {
          const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/review/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
             body: JSON.stringify(newReview),
          })
          .catch(error => {
            window.alert(error);
            return;
          });
          if(!response.ok) {
            const records = await response.json();
            console.log(records);
            const basicMessage = records.error.message.split(/:(.*)/s)
            const allErrors = basicMessage[1].split(",")
            console.log(allErrors)
            allErrors.forEach(runErrorMessaging);
          } else {
            setReview(true)
          }
        }
    }

    function runErrorMessaging(message) {
          const value = message.split(":")[1];
          let error = message.split(":")[0];
          error = error.replace(/\s/g, '');

          showErrors(error, value);
          console.log(error)
    }

    function showErrors(nameOfValue, message) {
      switch (nameOfValue) {
        case "comment":
          showCommentError(true)
          setCommentError(message)
          break;
        default:
          break;
      }
    }

    function hideErrors() {
      showCommentError(false)

    }

    if (actualID == "") {
      return (
        <div>
            <span class="writereview-form-title">
              Please login to write reviews.
            </span>
            <span class="writereview-form-title-3">
              Note: All reviews are anonymous. Although, we do ask you to sign-in using a JHU email to ensure that reviews are only submitted by JHU students.
            </span>
        </div>
      );
    } else if (!reviewSubmitted && !datasource.courseIDs.includes({record}.record)) {
      return (
        <div>
            <span class="writereview-form-title">
               Write A Review
            </span>
            {commentErrorBoolean && <Alert message={commentError} type="error" showIcon/>}
            <div class="wrap-input1 validate-input">
					   <textarea class="input1" name="message" placeholder="Add the basis of your review here!" onChange={e => updateForm({ comment: e.target.value,score: sentiment.analyze(e.target.value).score })} value={form.comment}></textarea>
					   <span class="shadow-input1"></span>
			   	  </div>

             <div class="slidecontainer">

            <input type="range" min="1" max="5" class="slider" id="myRange" onInput={e => updateForm({ difficulty: e.target.value})} value={form.difficulty}/>
            <p for="myRange" class="rangeValue">Difficulty: {form.difficulty}</p>
            </div>

            <div class="container-writereview-form-btn">
            <form class="container-writereview-form-btn" className="submitButton" onSubmit={enterReview}>
					   <button class="writereview-form-btn">
					   	  <span>
							    Submit Review
							  <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
						   </span>
			  		  </button>
            </form>
				   </div>
      </div>
    );
    } else {
      return (
        <div>
            <span class="writereview-form-title">
               Thank you for adding your review!
            </span>
        </div>
      );
    }
  }

  export default WriteReview;

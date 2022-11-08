import { OmitProps } from "antd/lib/transfer/ListBody";
import React from "react";
import { useState } from "react";
import Axios from "axios";
import './style/css/CourseComponent.scss';
import { Alert } from 'antd';


function WriteReview({record}) {

    const [initialReview, setInitialReview] = useState("");
    const [authorError, setAuthorError] = useState("");
    const [commentError, setCommentError] = useState("");
    const [authorErrorBoolean, showAuthorError] = useState(false);
    const [commentErrorBoolean, showCommentError] = useState(false);

    const [form, setForm] = useState({        
        sectionID: {record}.record,
        stars: "",
        initialReview: "",
        author: ""
    });
    const [reviewSubmitted, setReview] = useState(false);
      
    function updateForm(value) {
        return setForm((prev) => {
          return { ...prev, ...value };
        });
    }

    async function enterReview(e) {
        e.preventDefault();
        setForm((prev) => {
          return { ...prev, sectionID: {record}.record}})
        const newReview = { ...form };
        
        hideErrors();
        const spaceCheckComments = form.initialReview.replace(/\s/g, '');
        if(spaceCheckComments.length < 1) {
          showCommentError(true)
          setCommentError("You need to add a review to you know your review!")   
        }

        const spaceCheckAuthor = form.author.replace(/\s/g, '');
        if(spaceCheckAuthor.length < 1) {
          showAuthorError(true)
          setAuthorError("You need to start by authoring this so people can refer to it!")   
        } 

        if(spaceCheckAuthor.length > 1 && spaceCheckComments.length > 1) {
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
        case "author":
          showAuthorError(true)
          setAuthorError(message)
          break;
        case "comment":
          showCommentError(true)
          setCommentError(message)
          break;
        default:
          break;
      }
    }

    function hideErrors() {
      showAuthorError(false)
      showCommentError(false)
        
    }

    if (!reviewSubmitted) {
    return (
        <div>
            <span class="writereview-form-title">
               Write A Review
            </span>
            {authorErrorBoolean && <Alert message={authorError} type="error" showIcon/>}
            <div class="wrap-input1 validate-input">
				     	<input class="input1" type="text" name="name" placeholder="Name" onChange={e => updateForm({ author: e.target.value })} value={form.author}/>
					    <span class="shadow-input1"></span>
			    	</div>
            {commentErrorBoolean && <Alert message={commentError} type="error" showIcon/>}
            <div class="wrap-input1 validate-input">
					   <textarea class="input1" name="message" placeholder="Add the basis of your review here!" onChange={e => updateForm({ initialReview: e.target.value })} value={form.initialReview}></textarea>
					   <span class="shadow-input1"></span>
			   	  </div>

             <div class="slidecontainer">
             
            <input type="range" min="0" max="5" class="slider" id="myRange" onInput={e => updateForm({ stars: e.target.value})} value={form.stars}/>
            <p for="myRange" class="rangeValue">Difficulty: {form.stars}</p>
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

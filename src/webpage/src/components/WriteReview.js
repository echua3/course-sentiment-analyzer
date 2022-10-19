import { OmitProps } from "antd/lib/transfer/ListBody";
import React from "react";
import { useState } from "react";
import Axios from "axios";
import './style/css/CourseComponent.scss';




function WriteReview({record}) {

    const [initialReview, setInitialReview] = useState("");
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
        
        await fetch("http://localhost:" + process.env.REACT_APP_SERVERPORT + "/review/add", { 
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
        setReview(true)
        
    }

    if (!reviewSubmitted) {
    return (
        <div>
            <span class="writereview-form-title">
               Write A Review
            </span>
            <div class="wrap-input1 validate-input">
				     	<input class="input1" type="text" name="name" placeholder="Name" onChange={e => updateForm({ author: e.target.value })} value={form.author}/>
					    <span class="shadow-input1"></span>
			    	</div>
            <div class="wrap-input1 validate-input">
					   <textarea class="input1" name="message" placeholder="Add the basis of your review here!" onChange={e => updateForm({ initialReview: e.target.value })} value={form.initialReview}></textarea>
					   <span class="shadow-input1"></span>
			   	  </div>

             <div class="slidecontainer">
             <p for="myRange" class="rangeValue">Difficulty: </p>
            <input type="range" min="0" max="5" class="slider" id="myRange" onInput={e => updateForm({ stars: e.target.value})} value={form.stars}/>
            <span class="rangeValue">&nbsp; 0 &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp; 1 &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp; 2 &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp; 3 &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp; 4 &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp; 5</span>
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

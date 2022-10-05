import React, { useState } from "react";
import { useNavigate } from "react-router";
import $ from "jquery";

 
export default function Create() {
 const [form, setForm] = useState({
  classID: "",
  reviewID: "",
  stars: "",
  initialReview: "",
  sentiment: ""
 });
 const navigate = useNavigate();

 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newRecord = { ...form };
 
   await fetch("http://localhost:1000/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newRecord),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ classID: "", reviewID: "", stars: "", initialReview: "", sentiment: "" });
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Courses</h3>
     <html>
     <head>
     <script>
      $(document).ready(function(){
        $.getJSON("https://sis.jhu.edu/api/classes/Whiting%20School%20of%20Engineering/EN%20Computer%20Science/current?key=Iuw2pbsrh81TROyqQ7pwPRyfx7ha6XiN", function(result){
          $.each(result, function(i, field){
            $("div").append(field.Title + "\n");
          });
        })
      });
     </script>
     </head>
     <body>
     <div></div>
     </body>
     </html>
   </div>
 );
}
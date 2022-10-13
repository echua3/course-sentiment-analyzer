import React from "react";
import { useState } from "react";

function WriteReview(record) {

    const [form, setForm] = useState({        
        classID: "",
        reviewID: "",
        stars: "",
        initialReview: ""
    });
      
    function updateForm(value) {
        return setForm((prev) => {
          return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
      
        const newPerson = { ...form };
      
        await fetch("http://localhost:1000/review/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPerson),
        })
        .catch(error => {
          window.alert(error);
          return;
        });
      
        setForm({ classID: {record}, reviewID: "", stars: "", initialReview: "" });
    }

    return (
        <div>
            <label htmlFor="name">Write a review:</label>
            <div className="form-group">
            <textarea
                type="text"
                className="form-control"
                id="name"
                value={form.initialReview}
                onChange={(e) => updateForm({ initialReview: e.target.value })}
            />
            </div>
            <div className="form-group">
                <input
                type="submit"
                value="Submit review"
                className="btn btn-primary"
                onFinish={onSubmit}
                />
            </div>
      </div>
    );
  }
  
  export default WriteReview;

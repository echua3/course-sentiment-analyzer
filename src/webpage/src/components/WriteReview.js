import { OmitProps } from "antd/lib/transfer/ListBody";
import React from "react";
import { useState } from "react";
import Axios from "axios";

function WriteReview(record) {

    const [initialReview, setInitialReview] = useState("");

    /*const [form, setForm] = useState({        
        classID: "",
        reviewID: "",
        stars: "",
        initialReview: ""
    });
      
    function updateForm(value) {
        return setForm((prev) => {
          return { ...prev, ...value };
        });
    }*/

    async function onSubmit(e) {
        e.preventDefault();
        const data = new FormData();
        data.append("classID", {record});
        data.append("reviewID", "");
        data.append("stars", "");
        data.append("initialReview", initialReview);
        setInitialReview("");
        const newReview = await Axios.post("/write-review", data, { headers: { "Content-Type": "multipart/form-data" } })
        record.setInitialReview(prev => prev.concat([newReview.data]))

        /*const newPerson = { ...form };
      
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
      
        setForm({ classID: {record}, reviewID: "", stars: "", initialReview: "" });*/
    }

    return (
        <div>
            <label htmlFor="name">Write a review:</label>
            <div className="initialReview">
                <textarea onChange={e => setInitialReview(e.target.value)} value={initialReview} type="text" className="initialReview" />
            </div>
            <div className="submitButton" onSubmit={onSubmit}>
                <input
                type="submit"
                value="Submit review"
                className="btn btn-primary"
                />
            </div>
      </div>
    );
  }
  
  export default WriteReview;

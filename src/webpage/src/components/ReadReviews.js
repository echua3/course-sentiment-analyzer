import React, { useEffect } from "react";
import { useState } from "react";
import './style/css/CourseComponent.scss';
import { Pagination } from "@material-ui/lab";
import { List } from "antd";
import Review from "./Review";
    
function ReadReview({record}) {

    const [pageNumber, setPageNumber] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [recordValues, setRecords] = useState([]);
    const [userUps, setUserUps] = useState([]);
    const [userDowns, setUserDowns] = useState([]);
    const userId = window.userID;


    useEffect( () => {
        async function getRecords() {
            const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/review/sectionID/" + {record}.record.SSS_SectionsID + "/" + pageNumber)
            if(!response.ok) {
              console.log("Error:" + response.statusText);
              return;
            }
            const records = await response.json();
            setRecords(records.data);
            setPageCount(records.numberOfPage);
            console.log(pageCount);
            console.log({record}.record.SSS_SectionsID);
        }
        getRecords();

        async function getUser() {
          const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/user/" + userId)
            if(!response.ok) {
              console.log("Error:" + response.statusText);
              return;
            }
            const records = await response.json();
            let upvoteIDs = records.data[0].reviewUpvoteIDs;
            setUserUps(upvoteIDs);
            setUserDowns(records.data[0].reviewDownvoteIDs);
        }
        getUser();
        return;
    }, [recordValues.length]);
    
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPageNumber(value);
        async function changeRecords() {
          const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/review/sectionID/" + {record}.record.SSS_SectionsID+ "/" + value)
          if(!response.ok) {
            console.log("Error:" + response.statusText);
            return;
          }
          const records = await response.json();
          setRecords(records.data);
        }
        changeRecords();

        async function updateUser() {
          const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/user/" + userId)
            if(!response.ok) {
              console.log("Error:" + response.statusText);
              return;
            }
            const records = await response.json();
            let upvoteIDs = records.data[0].reviewUpvoteIDs;
            setUserUps(upvoteIDs);
            setUserDowns(records.data[0].reviewDownvoteIDs);
        }
        updateUser();
    };

    return (
        <div>
           <List 
              className ="comment-list"
              itemLayout ="horizontal"
              dataSource ={recordValues}
              renderItem = {item => (
                <Review key={item._id} review={item} userUps={userUps} userDowns={userDowns}/>
              )}/>
 
              <Pagination
                  count = {pageCount}
                  page = {pageNumber}
                  variant = "outlined"
                  color = "primary"
                  onChange={handleChange}
              />
        </div>
    );


  }

  
  export default ReadReview;

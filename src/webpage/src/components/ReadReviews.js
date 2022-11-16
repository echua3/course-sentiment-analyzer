import { OmitProps } from "antd/lib/transfer/ListBody";
import React, { useEffect } from "react";
import { useState } from "react";
import './style/css/CourseComponent.scss';
import { Pagination, PaginationItem } from "@material-ui/lab";
import { List } from "antd";
import Review from "./Review";

function happyOrSad(par1) {

  if(par1>0)
  {
   return 1;
  }
  else if(par1<0)
  {
    return -1;
  }
  else
  {
    return 0;
  }
}

    
function ReadReview({record}) {

    const [pageNumber, setPageNumber] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [recordValues, setRecords] = useState([]);
    const [sectionID, setSectionIDs] = useState({record});
    const [form, setForm] = useState();
    const [userUps, setUserUps] = useState([]);
    const [userDowns, setUserDowns] = useState([]);
    const userId = window.userID;


    useEffect( () => {
        async function getRecords() {
            const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/review/sectionID/" + {record}.record.SSS_SectionsID + "/" + pageNumber)
            if(!response.ok) {
              const message = "An error occurred"
              console.log("Error:" + response.statusText);
              return;
            }
            const records = await response.json();
            // console.log(records.data);
            // console.log(pageNumber);
            setRecords(records.data);
            setPageCount(records.numberOfPage);
            console.log(pageCount);
            console.log({record}.record.SSS_SectionsID);
        }
        getRecords();

        async function getUser() {
          const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/user/" + userId)
            if(!response.ok) {
              const message = "An error occurred"
              console.log("Error:" + response.statusText);
              return;
            }
            const records = await response.json();
            // console.log("USER:", records);
            // setUserUps(records.data[0].reviewUpvoteIDs);
            let upvoteIDs = records.data[0].reviewUpvoteIDs;
            setUserUps(upvoteIDs);

            // console.log(records.data[0].reviewUpvoteIDs);
            // console.log("UserUpvoteIDs:", userUps);
    
            setUserDowns(records.data[0].reviewDownvoteIDs);
            // console.log("UserDownvoteIDS:", userDowns);
        }
        getUser();
        // console.log("recordValues.length: ", recordValues.length);

        return;
    }, [recordValues.length]);

    // get user data
    // async function getUser() {
    //   const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/user/" + userId)
    //     if(!response.ok) {
    //       const message = "An error occurred"
    //       console.log("Error:" + response.statusText);
    //       return;
    //     }
    //     const records = await response.json();
    //     console.log("USER:", records);
    //     // setUserUps(records.data[0].reviewUpvoteIDs);
    //     let upvoteIDs = records.data[0].reviewUpvoteIDs;
    //     setUserUps(upvoteIDs);
    //     console.log(records.data[0].reviewUpvoteIDs);
    //     console.log("UserUpvoteIDs:", userUps);

    //     setUserDowns(records.data[0].reviewDownvoteIDs);
    //     console.log("UserDownvoteIDS:", userDowns);
    // }
    // if (!userQuery) {
    //   getUser();
    //   userQuery = true;
    // }

    
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPageNumber(value);
        async function changeRecords() {
          const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/review/sectionID/" + {record}.record.SSS_SectionsID+ "/" + value)
          if(!response.ok) {
            const message = "An error occurred"
            console.log("Error:" + response.statusText);
            return;
          }
          const records = await response.json();
          // console.log(records.data);
          // console.log(pageNumber);
          setRecords(records.data);
          console.log(pageCount);
        }
        changeRecords();

        async function updateUser() {
          const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/user/" + userId)
            if(!response.ok) {
              const message = "An error occurred"
              console.log("Error:" + response.statusText);
              return;
            }
            const records = await response.json();
            // console.log("USER:", records);
            // setUserUps(records.data[0].reviewUpvoteIDs);
            let upvoteIDs = records.data[0].reviewUpvoteIDs;
            setUserUps(upvoteIDs);

            // console.log(records.data[0].reviewUpvoteIDs);
            // console.log("UserUpvoteIDs:", userUps);
    
            setUserDowns(records.data[0].reviewDownvoteIDs);
            // console.log("UserDownvoteIDS:", userDowns);
        }
        updateUser();
        // console.log("HANDLED CHANGE:", recordValues);

    };

    return (
        <div>
           <List className ="comment-list" 
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

import { OmitProps } from "antd/lib/transfer/ListBody";
import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import './style/css/CourseComponent.scss';
import { Pagination, PaginationItem } from "@material-ui/lab";
import { List, Comment } from "antd";
    
function ReadReview({record}) {

    const [pageNumber, setPageNumber] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [recordValues, setRecords] = useState([]);
    const [sectionID, setSectionIDs] = useState({record});
    const [form, setForm] = useState();
   

    useEffect( () => {
        async function getRecords() {
            const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/review/sectionID/" + {record}.record.SSS_SectionsID + "/" + pageNumber)
            if(!response.ok) {
              const message = "An error occured"
              console.log("Error:" + response.statusText);
              return;
            }
            const records = await response.json();
            // console.log(records.data);
            console.log(pageNumber);
            setRecords(records.data);
            setPageCount(records.numberOfPage);
        }   
        getRecords();

        return;
    }, [recordValues.length]);
    
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        async function changeRecords() {
            setPageNumber(value)
            const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/review/sectionID/" + {record}.record.SSS_SectionsID + "/" + value)
            if(!response.ok) {
              const message = "An error occured"
              console.log("Error:" + response.statusText);
              return;
            }
            const records = await response.json();
            // console.log(records.data);
            setRecords(records.data);
        }   
        changeRecords();
        console.log(recordValues);

    };

    return (
        <div>
           <List className ="comment-list" 
              itemLayout ="horizontal"
              dataSource ={recordValues}
              renderItem = {item => (
                <li>
                    <Comment
                        content = {
                            <h6>
                              {item.comment}
                            </h6>
                        }
                        author = {
                            <p>
                               By - {item.author}
                            </p>    
                        }
                        
                        />
                </li>
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

import React from "react";
import { useState,useEffect} from "react";
import './style/css/CourseComponent.scss';
import { Row, Col } from "antd";

function CourseSummary({record}) {
    const [Title, setTitle] = useState({record}.record.Title);
    const instructorsFullName = {record}.record.InstructorsFullName
    const [recordValues, setRecords] = useState([]);
    const offeringName = {record}.record.OfferingName;
    const courseDescription = {record}.record.Description;
    const sectionName = {record}.record.SectionName;
    const term = {record}.record.Term;
    useEffect( () => {
      async function getRecords() {
          const response = await fetch(process.env.REACT_APP_API_ENDPOINT + "/review/sectionID/" + {record}.record.SSS_SectionsID)
          if(!response.ok) {
            console.log("Error:" + response.statusText);
            return;
          }
          const records = await response.json();
          setRecords(records.data);
      }
      getRecords();
      return;
   }, [recordValues.length]);
      return (
        <div>
            <span class ="courseSummary-form-title">
               {Title}
            </span>
            <h6> {offeringName} ({sectionName}) taught by {instructorsFullName} in {term} </h6>
            <p> {courseDescription} </p>

         </div>
      );
}
export default CourseSummary;

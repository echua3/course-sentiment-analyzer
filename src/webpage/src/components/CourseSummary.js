import { OmitProps } from "antd/lib/transfer/ListBody";
import React from "react";
import { useState } from "react";
import Axios from "axios";
import './style/css/CourseComponent.scss';
import { Row, Col } from "antd";
import PieChart from './PieChart.js'

function CourseSummary({record}) {
    const [Title, setTitle] = useState({record}.record.Title);
    const [Prereq, setPrereq] = useState({record}.record.SectionRegRestrictions);
    const instructorsFullName = {record}.record.InstructorsFullName
    const offeringName = {record}.record.OfferingName
    const sectionName = {record}.record.SectionName
    const term = {record}.record.Term
    // const description = {record}.record.SectionDetails.Description
    return (
        <div>
            <Row>
    <Col span={16} push={8}>
    <span class="courseSummary-form-title">
    ⭐⭐⭐⭐⭐
         </span>
    </Col>

    <Col span={8} pull={16}>
    <span class="writereview-form-title">
         {Title}
    </span>
    </Col>
  </Row>
     <h6>
        {offeringName} ({sectionName}) taught by {instructorsFullName} in {term}
     </h6>
     <p>
        Add desc. manually or bypass (no description data from API)
     </p>
     <Row> 
      <Col span={18} push={12}>
         <PieChart/>
       Chart 1
      </Col>
      <Col span={6} pull={12}>
      <PieChart/>
         Chart 2
         </Col>
       
     </Row>
   </div>
    );
}
export default CourseSummary;

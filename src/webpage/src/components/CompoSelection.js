import React from "react";
import CourseTable from "./CourseTable";
import ResultPrompts from "./ResultPrompts";
import "./style/css/CourseComponent.scss"

function CompoSelection(props) {
    const result = props.status
    if (result=="success"){
        return <CourseTable pagination={props.pagination} data={props.data}/>
    }
    else {
        return <ResultPrompts status={props.status} title={props.title} subTitle={props.subTitle}/>
    }

}

export default CompoSelection;

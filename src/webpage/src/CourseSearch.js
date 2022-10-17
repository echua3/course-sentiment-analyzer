import "./index.css";
import "./components/Searchbar";
import "./components/WriteReview";
import "./components/CourseTable";
import SearchBar from "./components/Searchbar";
import CourseTable from "./components/CourseTable";
import axios from "axios";

import React, { useState } from "react";

function CourseSearch() {

  const [datasource, setDatasource]=useState([])


//   function onSubmit(values){
//     const { CourseTitle, CourseNumber, Credits, Department } = values;
//     //
//     const opt = {
//       method: "GET",
//       params:{CourseTitle,CourseNumber, Credits, Department},
//       url: `/api/classes?key=9N7pYLkUVHSf8xzgFWMK5Cv7jnmQAzFo`,
//     };
//     axios(opt)
//       .then((res) => {
//         if (res.status === 200) {
//           setDatasource(res.data)
//           // message.success("Login succeed! ");
//         }
//       })
//       .catch((err) => {
//         console.log("failed: ", err.message);
//       });
// }



  return (
    <div className="App">
      <SearchBar  onFinish={onSubmit}/>
      <CourseTable data={datasource}/>
    </div>
  );
}
export default CourseSearch;

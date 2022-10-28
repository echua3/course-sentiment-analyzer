import React from "react";
import ReactDOM from "react-dom";

import HomePage from "./components/HomePage";
import CourseSearch from "./components/CourseSearch";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(<CourseSearch />, rootElement);
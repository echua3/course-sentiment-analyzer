import logo from './logo.svg';
import './App.css';
import React from "react"
import { Route, Routes } from "react-router-dom";
import {BrowserRouter as Router}  from "react-router-dom";
import Create from './components/create';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Create />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

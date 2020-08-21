import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import addColor from './components/add-color/addColor'
import Login from "./components/login/Login";
import "./styles.scss";
import BubblePage from './components/BubblePage'
import PrivateRoute from './auth/PrivateRoute'

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <PrivateRoute path='/bubbles' component={BubblePage}></PrivateRoute>
        <PrivateRoute path='/add-color' component={addColor}></PrivateRoute>

        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
      </div>
    </Router>
  );
}

export default App;

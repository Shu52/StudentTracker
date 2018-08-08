import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class NavBarInstructor extends Component {
  render() {
    return (
      <div className ="nav">
        <Link to="/" className="linkClass">Instructor View</Link>
        <Link to="/bystudent">By Student</Link>
        <Link to="/byexercise">By Exercise</Link>
      </div>
    );
  }
}
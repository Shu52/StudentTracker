import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class NavBarStud extends Component {
  render() {
    return (
      <div className ="nav">
        <Link to="/" className="linkClass">Student View</Link>
        <Link to="/completed">Completed</Link>
        <Link to="/stucks">Stuck</Link>
      </div>
    );
  }
}
import React, { Component } from "react";

import Navbar from "../../nav/NavbarInstructor"
export default class StudentView extends Component {
   studentId  = JSON.parse(sessionStorage.getItem("credentials"));
render() {
    return (
    <React.Fragment>
        <h1 className ="blockquote text-center">Make them BLEED,<strong> {this.studentId.name} </strong>! Make them suffer!</h1>
        <Navbar/>
        <h1 className = "text-center">(Placeholder for future content)</h1>

    </React.Fragment> 
    )}
}
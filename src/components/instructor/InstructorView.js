import React, { Component } from "react";

import Navbar from "../../nav/NavbarInstructor"
export default class InstructorView extends Component {
    state ={
        cohortNumber:0
    }
    getCohortNumber = (evt) => {
        const stateToChange={cohortNumber:evt.target.value}
        console.log(stateToChange)
        this.setState(stateToChange)
    }
    //set state for cohort selected a method that will change state and pass to navbar
   studentId  = JSON.parse(sessionStorage.getItem("credentials"));
render() {
    return (
    <React.Fragment>
        <h1 className ="blockquote text-center">Make them BLEED,<strong> {this.studentId.name} </strong>! Make them suffer!</h1>
        <Navbar/>
       <a className = "center-me" href ="http://studentspy.bangazon.com/">Spy App</a>

    </React.Fragment> 
    )}
}
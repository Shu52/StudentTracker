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
   Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
    }
render() {
    return (
    <React.Fragment>
        <h1 className ="blockquote text-center">Make them <span className = "bleed">BLEED</span>,<strong> {this.Capitalize(this.studentId.name)} </strong>! Make them suffer!</h1>
        <Navbar/>
        <h3 className ="center-me">ToolBox</h3>
        <a className = "center-me" href ="http://studentspy.bangazon.com/">Commit App</a>
        <a className = "center-me" href = "https://imgflip.com/memegenerator">Meme Maker</a>
        <img src="https://media.giphy.com/media/o0vwzuFwCGAFO/giphy.gif" alt="" width="20%" className ="center-me"></img>
    </React.Fragment> 
    )}
}
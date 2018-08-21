import React, { Component } from "react";
import ExerciseList from "../exercise/ExerciseList"
import Navbar from "../../nav/NavbarStud"
import StudentGreeting from "./StudentGreeting"
export default class StudentView extends Component {
    Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
        }
   studentId  = JSON.parse(sessionStorage.getItem("credentials"));
render() {
    return (
    <React.Fragment>
       <StudentGreeting/>
        <Navbar/>
        <ExerciseList />
    </React.Fragment> 
    )}
}
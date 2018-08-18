import React, { Component } from "react";
import ExerciseList from "../exercise/ExerciseList"
import Navbar from "../../nav/NavbarStud"
export default class StudentView extends Component {
    Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
        }
   studentId  = JSON.parse(sessionStorage.getItem("credentials"));
render() {
    return (
    <React.Fragment>
        <h1 className ="blockquote text-center">You can do it,<strong> {this.Capitalize(this.studentId.name)} </strong>! We Believe in You!</h1>
        <Navbar/>
        <ExerciseList />
    </React.Fragment> 
    )}
}
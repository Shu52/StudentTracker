import React, { Component } from "react";
import ExerciseList from "../exercise/ExerciseList"
export default class StudentView extends Component {
   studentId  = JSON.parse(localStorage.getItem("credentials"));
render() {
    return (
      <React.Fragment>
        <h1 className ="blockquote text-center">You can do it,{this.studentId.name}! We Believe in You!</h1>
    <ExerciseList/>
        </React.Fragment> 
    )}
}
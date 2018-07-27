import React, { Component } from "react";
import ExerciseList from "../exercise/ExerciseList"
export default class StudentView extends Component {

render() {
    return (
      <React.Fragment>
        <h1 className ="blockquote text-center">You can do it,(Placeholder for current user)</h1>
    <ExerciseList/>
        </React.Fragment> 
    )}
}
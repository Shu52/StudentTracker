import React, { Component } from "react";
import ExerciseCard from "./ExerciseCard";
import API from "../../APIManger";

export default class ExerciseList extends Component {
state = {
    exercises: [],
    studentExercises:[]
}
componentDidMount() {
  let studentId  = JSON.parse(sessionStorage.getItem("currentUser"));
    API.getAll(`studentExercises?studentId=${studentId}&_expand=exercise`)
    .then(studentExercises => this.setState({ studentExercises }))
  }
  
  render() {
    return (
      <React.Fragment>
        <ul>
          {this.state.studentExercises.map(exercise => (
            
            <ExerciseCard
              key={exercise.id}
              studentExercises={exercise}
              
            />
          ))}
        </ul>
      </React.Fragment>
    );
  }
}//end of class

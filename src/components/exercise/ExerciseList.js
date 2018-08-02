import React, { Component } from "react";
import ExerciseCard from "./ExerciseCard";
import API from "../../APIManger";

export default class ExerciseList extends Component {
state = {
    exercises: [],
    studentExercises:[],
    tableBuilt:this.props.tableBuilt
}
//componentdidupdate (prevState) tableBuilt=true wrapped 
componentDidMount() {
  // if (this.props.tableBuilt === false) {
    console.log("in did mount")
    debugger
    let studentId  = JSON.parse(sessionStorage.getItem("currentUser"));
    API.getAll(`studentExercises?studentId=${studentId}&_expand=exercise`)
    .then(studentExercises => {
      console.log(studentExercises)
      this.setState({ studentExercises })})
  // }
}

// componentDidUpdate(oldProps) {
//   if(this.props.studentExercises.studentId !== oldProps.studentExercises.studentId) {
//     let studentId  = JSON.parse(sessionStorage.getItem("currentUser"));
//     API.getAll(`studentExercises?studentId=${studentId}&_expand=exercise`)
//   .then(studentExercises => this.setState({ studentExercises }))
//     }
//   }



render() {
  console.log("table built in Exercise list",this.props.tableBuilt)
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

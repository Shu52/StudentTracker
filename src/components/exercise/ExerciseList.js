import React, { Component } from "react";
import ExerciseCard from "./ExerciseCard";
import API from "../../APIManger";

export default class ExerciseList extends Component {
state = {
    exercises: [],
}
componentDidMount() {
    API.getAll("exercises")
    .then(exercises => this.setState({ exercises }))
  }
  
  render() {
    return (
      <React.Fragment>
        <ul>
          {this.state.exercises.map(exercise => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              
            />
          ))}
        </ul>
      </React.Fragment>
    );
  }
}//end of class

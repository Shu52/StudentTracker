import React, { Component } from "react";
import ExerciseCard from "../exercise/ExerciseCard";
import API from "../../APIManger";
import Navbar from "../../nav/NavbarStud"
import StudentGreeting from "./StudentGreeting"

export default class CompleteView extends Component {
    state = {
        exercises: [],
        studentExercises:[],
    }
    studentId  = JSON.parse(sessionStorage.getItem("credentials"));
    
    componentDidMount() {  
        let studentId  = JSON.parse(sessionStorage.getItem("currentUser"));
        API.getAll(`studentExercises?userId=${studentId}&stuck=true&_expand=exercise`)
        .then(studentExercises => {this.setState({ studentExercises })})
    }
    
    render() {
      console.log("stuck view",this.state.studentExercises)
      return (
        <React.Fragment>
          <StudentGreeting/>
        <Navbar/>
            <div className ="flexBox-container" >
              {this.state.studentExercises.map(exercise => {
                console.log("exercise",exercise)
               return  <ExerciseCard
                  key={exercise.id}
                  studentExercises={exercise}              
                />
    })}
            </div>
          </React.Fragment>
        );
      }
    }//end of class
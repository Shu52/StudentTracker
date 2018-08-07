import React, { Component } from "react";
import ExerciseCard from "../exercise/ExerciseCard";
import API from "../../APIManger";
import Navbar from "../../nav/NavbarStud"

export default class CompleteView extends Component {
    state = {
        exercises: [],
        studentExercises:[],
    }
    studentId  = JSON.parse(sessionStorage.getItem("credentials"));
    
    componentDidMount() {  
        let studentId  = JSON.parse(sessionStorage.getItem("currentUser"));
        API.getAll(`studentExercises?studentId=${studentId}&complete=true&_expand=exercise`)
        .then(studentExercises => {this.setState({ studentExercises })})
    }
    
    render() {
      
      return (
        <React.Fragment>
          <h1 className ="blockquote text-center">You can do it,<strong> {this.studentId.name} </strong>! We Believe in You!</h1>
        <Navbar/>
            <div className ="flexBox-container" >
              {this.state.studentExercises.map(exercise => {
                
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
    
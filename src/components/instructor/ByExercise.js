import React, { Component } from "react";
import API from "../../APIManger";
import ByExerciseCard from "./ByExerciseCard"
import Navbar from "../../nav/NavbarInstructor"

export default class ByExercise extends Component {
state = {
    exercisesEmbed: []
    
}

componentDidMount() {  
    API.getAll("exercises?_embed=studentExercises")
    .then(exercisesEmbed => {this.setState({ exercisesEmbed })})
}
render(){
    console.log("exercisesEmbed",this.state.exercisesEmbed)
    return(
        <React.Fragment>
            <h1>TESTING</h1>
            <Navbar/>
            <div className ="flexBox-container" >
          {this.state.exercisesEmbed.map(exercisesEmbed => (

            <ByExerciseCard
              key={exercisesEmbed.id}
              exercises={exercisesEmbed}              
            />
          ))}
        </div>
            </React.Fragment>
    )
}
}//end of Class
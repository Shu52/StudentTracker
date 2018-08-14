import React, { Component } from "react";
import API from "../../APIManger";
import ByStudentCard from "./ByStudentCard"
import Navbar from "../../nav/NavbarInstructor"
export default class ByStudent extends Component {
state = {
    students: [],
    cohortNumber:this.props.location.state.cohortNumber
    
}

componentDidMount() {  
    API.getAll(`users?instructor=false&cohort=${this.state.cohortNumber}`)
    .then(students => {this.setState({ students })})
}

componentDidUpdate(prevProps){
    if (prevProps.location.state.cohortNumber !== this.props.location.state.cohortNumber){
        console.log("did update",prevProps.location.state.cohortNumber)
        API.getAll(`users?instructor=false&cohort=${this.props.location.state.cohortNumber}`)
        .then(students => {this.setState({ students })})
    }
}
numberCompletes=()=> {

}
render(){
    console.log("students",this.state.students[0])
    return(
        <React.Fragment>
            <h1>TESTING</h1>
            <Navbar/>
            <div className ="flexBox-container" >
          {this.state.students.map(student => (
            <ByStudentCard
              key={student.id}
              students={student}              
            />
          ))}
        </div>
            </React.Fragment>
    )
}
}//end of Class
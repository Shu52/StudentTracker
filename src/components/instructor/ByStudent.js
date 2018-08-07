import React, { Component } from "react";
import API from "../../APIManger";
import ByStudentCard from "./ByStudentCard"
export default class ByStudent extends Component {
state = {
    students: []
    
}

componentDidMount() {  
    API.getAll("users?instructor=false")
    .then(students => {this.setState({ students })})
}
render(){
    // console.log("students",this.state.students)
    return(
        <React.Fragment>
            <h1>TESTING</h1>
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
import React, { Component } from "react";
import API from "../../APIManger";
import ByStudentCard from "./ByStudentCard"
import Navbar from "../../nav/NavbarInstructor"
export default class ByStudent extends Component {
state = {
    students: [],
    cohortNumber:this.props.location.state.cohortNumber,
    studentsCard:[],
}

componentDidMount() { 
    this.loadPage()
    // API.getAll(`users?instructor=false&cohort=${this.state.cohortNumber}&_embed=studentExercises`)
    // .then(students => {this.setState({ students })})
}

loadPage (){
    let embedUsers = []
    // will hold return from the flattened array
    API.getAll(`users?instructor=false&cohort=${this.props.location.state.cohortNumber}&_embed=studentExercises`)
    .then((students) => {
        this.setState({students })
        console.log("students", students)
        embedUsers = students.reduce((accumulator, studExer) => {
            console.log("studExer",studExer)
            let stud = {
                name:studExer.name,
                studentExercises:studExer.studentExercises
            }
            return accumulator.concat(stud)
        }, [])
        //flattens the array, we did it this way because flat() and flatMap()is experimental technology
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat#reduce_and_concat
    })
    .then(() => {
        // made an array from exercises that we can add keys to
        console.log("Structure of embedUsers",embedUsers)
        embedUsers.map(elementOfEmbedUsers => {
            console.log("embedUsers",elementOfEmbedUsers.studentExercises)
                elementOfEmbedUsers.studentExercises.forEach(function(element){
                    console.log("element",element.complete)
                    if (element.complete) {
                        if (elementOfEmbedUsers.hasOwnProperty("numOfCompletes")) {
                            elementOfEmbedUsers.numOfCompletes++
                        } else {
                            elementOfEmbedUsers.numOfCompletes = 1
                        }
                        //add property of complete or increment number of completes is property exists
                    }
                    if (element.stuck) {
                        if (elementOfEmbedUsers.hasOwnProperty("numOfStucks")) {
                            elementOfEmbedUsers.numOfStucks++
                        } else {
                            elementOfEmbedUsers.numOfStucks = 1
                        }
                        //add property of stuck or increment number of stuck is property exists
                    }
                })
            })
            //.sort() b-a b.numOfStucks
            this.setState({studentsCard:embedUsers})
        //set state of exercises = modified plainExercises
    })
}

// componentDidUpdate(prevProps){
//     if (prevProps.location.state.cohortNumber !== this.props.location.state.cohortNumber){
//         console.log("did update",prevProps.location.state.cohortNumber)
//         API.getAll(`users?instructor=false&cohort=${this.props.location.state.cohortNumber}&_embed=studentExercises`)
//         .then(students => {this.setState({ students })})
//     }
// }
numberCompletes=()=> {

}
render(){
    console.log("studentsCard",this.state.studentsCard,this.state.studentsCard.numbOfCompletes)
    return(
        <React.Fragment>
            <h1>TESTING</h1>
            <Navbar/>
            <div className ="flexBox-container" >
          {this.state.studentsCard.map(student => (
            <ByStudentCard
              key={student.id}
              studentsCard={student}              
            />
          ))}
        </div>
            </React.Fragment>
    )
}
}//end of Class
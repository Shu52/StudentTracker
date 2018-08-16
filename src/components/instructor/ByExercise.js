import React, {Component} from "react";
import API from "../../APIManger";
import ByExerciseCard from "./ByExerciseCard"
import Navbar from "../../nav/NavbarInstructor"

export default class ByExercise extends Component {
    state = {
        exercises: [],
        cohortNumber: this.props.location.state.cohortNumber,
        embedUsers: [],
        feedback: "",
        exerciseName: "",
        arrayToPass: [],
        students: []

    }
    
    loadPage (){
        let embedUsers = []
        // will hold return from the flattened array
        API.getAll(`users?instructor=false&cohort=${this.props.location.state.cohortNumber}&_embed=studentExercises`)
        .then((students) => {
            this.setState({students })
            console.log("students", students)
            embedUsers = students.reduce((accumulator, studExer) => {
                return accumulator.concat(studExer.studentExercises)
            }, [])
            //flattens the array, we did it this way because flat() and flatMap()is experimental technology
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat#reduce_and_concat
        })
        .then(() => {return API.getAll("exercises?")})
        .then(exercises => {this.setState({exercises})})
        .then(() => {
            let plainExercises = this.state.exercises
            // made an array from exercises that we can add keys to
            embedUsers.map(elementOfEmbedUsers => {
                const findVar = plainExercises.find(function (elementInPlainExercises) {
                    //findVar is a reference for plainExercises. plainExercises will have added keys of complete and stuck
                    return elementInPlainExercises.id === elementOfEmbedUsers.exerciseId
                    //match exercise to corresponding student exercise
                })
                if (elementOfEmbedUsers.complete) {
                    if (findVar.hasOwnProperty("complete")) {
                        findVar.complete++
                    } else {
                        findVar.complete = 1
                    }
                    //add property of complete or increment number of completes is property exists
                }
                if (elementOfEmbedUsers.stuck) {
                    if (findVar.hasOwnProperty("stuck")) {
                        findVar.stuck++
                    } else {
                        findVar.stuck = 1
                    }
                    //add property of stuck or increment number of stuck is property exists
                }
            })
            this.setState({exercises: plainExercises})
            //set state of exercises = modified plainExercises
        })
    }

    componentDidMount() {
       this.loadPage()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.state.cohortNumber !== this.props.location.state.cohortNumber) {
            console.log("did update", prevProps.location.state.cohortNumber)
            this.loadPage()
        }
    }
    studentId  = JSON.parse(sessionStorage.getItem("credentials"));
    render() {
        return ( 
            <React.Fragment > 
            <h1 className ="blockquote text-center">Crush the whole cohort!<strong> {this.studentId.name} </strong>!</h1>
            <Navbar/>
            <div className = "flexBox-container" > {
                this.state.exercises.map(exercise => (
                    <ByExerciseCard 
                    key = {exercise.id}
                    exercises = {exercise}
                    />
                ))} 
            </div> 
            </React.Fragment>
        )
    }
} //end of Class
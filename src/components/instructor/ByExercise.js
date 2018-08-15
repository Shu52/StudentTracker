import React, { Component } from "react";
import API from "../../APIManger";
import ByExerciseCard from "./ByExerciseCard"
import Navbar from "../../nav/NavbarInstructor"

export default class ByExercise extends Component {
state = {
    exercises: [],
    cohortNumber:this.props.location.state.cohortNumber,
    embedUsers:[],
    feedback:"",
    exerciseName:"",
    arrayToPass:[],
    students:[]
    
}
//map end result an array of just student exercises,  (array from the map, loop through fetch for each exercise id in the studentExercises object then into promise.all)
//in did mount get exercises and set state for exercises. exercises name will be card title
//card will have number of completes and stuck per exercise
componentDidMount() {
    let embedUsers =[]
    API.getAll(`users?instructor=false&cohort=${this.props.location.state.cohortNumber}&_embed=studentExercises`)
    .then((students) =>{
        this.setState({ students })
        console.log("students",students)
        embedUsers = students.reduce((accumulator, studExer)=>{
            // console.log("studExer", studExer.studentExercises)
            return accumulator.concat(studExer.studentExercises)
        }, [])
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat#reduce_and_concat

        // console.log("embedUsers",embedUsers)
    //    const hardArray=embedUsers.map((studentExercises)=>{
    //         const filteredArray ={
    //             userId:studentExercises.userId,
    //             exerciseId:studentExercises.exerciseId,
    //             complete:studentExercises.complete,
    //             stuck:studentExercises.stuck,
    //             feedBack:studentExercises.feedback
    //         }
            // console.log("filtered Array from map",filteredArray)
            // this.setState({filteredArray})
            // return filteredArray
            // this.setState({embedUsers})
        })
        .then(()=>{
            return API.getAll("exercises?")
        })

        // embedUsers.forEach(myFunction);
        //     function myFunction(item){
        //      for(var id in item){
        //         console.log("another array with objects",item[id])
        //         // API.getAll(`exercises?${exerciseId}`)
        //         // for( var key in item )
        //     }}
        // })
        .then(exercises => {this.setState({ exercises })})
        .then(()=>{
            // console.log("hardArray",this.state.hardArray)
            let plainExercises=this.state.exercises
        
            
            embedUsers.map(softItem =>{
                // console.log("exercise.id",softItem.exerciseId)
                //find(exercise.id) on exercies id
                const findVar = plainExercises.find(function(element){
                    return element.id === softItem.exerciseId
                    
                })
                           if(softItem.complete){
                                   if(findVar.hasOwnProperty("complete")){
                                       findVar.complete++
                                   }
                                   else{
                                       findVar.complete=1
                                   }
                                }
                                if(softItem.stuck){
                                    if(findVar.hasOwnProperty("stuck")){
                                        findVar.stuck++
                                    }
                                    else{
                                        findVar.stuck=1
                                    }
                                        // console.log("arrayToPass",arrayToPass)
                                    }
                                    
                                })
                                this.setState({exercises:plainExercises})
                                console.log("findVar",plainExercises)
                // return arrayToPass 
            }
        )//end of hard Array map
        // console.log("arrayToPass",arrayToPass)
        // this.setState({arrayToPass})
    
    
            //     const mergedArray=[]
            //     if(filteredArray.exerciseId===exercisesEmbed.id){
                //         mergedArray.name = 
                //     }
                // })
            }
            //build an array from exercises, add a property for complete and stucks. Loop through student exercises for each one incerement complete or stuck key value for the exercise object in the exercises array that matches the exercise id in the student exercise object(use array.find)
            componentDidUpdate(prevProps){
                if (prevProps.location.state.cohortNumber !== this.props.location.state.cohortNumber){
                    console.log("did update",prevProps.location.state.cohortNumber)
                    API.getAll(`users?instructor=false&cohort=${this.props.location.state.cohortNumber}`)
                    .then(students => {this.setState({ students })})
                }}
            render(){
                // console.log("hardArray",this.state.hardArray)
                return(
                    <React.Fragment>
            <h1>TESTING</h1>
            <Navbar/>
            <div className ="flexBox-container" >
            {this.state.exercises.map(exercise => (
                // this.state.filteredArray.map(fArray=>(
                    
                    <ByExerciseCard
                    key={exercise.id}
                    exercises={exercise}
                    //   filteredArray = {fArray}             
                    />
                // ))
          ))}
        </div>
            </React.Fragment>
    )
}
}//end of Class
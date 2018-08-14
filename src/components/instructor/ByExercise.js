import React, { Component } from "react";
import API from "../../APIManger";
import ByExerciseCard from "./ByExerciseCard"
import Navbar from "../../nav/NavbarInstructor"

export default class ByExercise extends Component {
state = {
    exercises: [],
    cohortNumber:this.props.location.state.cohortNumber,
    hardArray:[],
    feedback:"",
    exerciseName:"",
    arrayToPass:[]
    
}
//map end result an array of just student exercises,  (array from the map, loop through fetch for each exercise id in the studentExercises object then into promise.all)
//in did mount get exercises and set state for exercises. exercises name will be card title
//card will have number of completes and stuck per exercise
componentDidMount() {  
    API.getAll(`users?instructor=false&cohort=${this.props.location.state.cohortNumber}&_embed=studentExercises`)
    .then((userEmbed) =>{
        // console.log("userEmbed",userEmbed)
        let embedUsers = userEmbed.reduce((accumulator, studExer)=>{
            // console.log("studExer", studExer.studentExercises)
            return accumulator.concat(studExer.studentExercises)
        }, [])
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat#reduce_and_concat

        // console.log("embedUsers",embedUsers)
       const hardArray=embedUsers.map((studentExercises)=>{
            const filteredArray ={
                userId:studentExercises.userId,
                exerciseId:studentExercises.exerciseId,
                complete:studentExercises.complete,
                stuck:studentExercises.stuck,
                feedBack:studentExercises.feedback
            }
            // console.log("filtered Array from map",filteredArray)
            // this.setState({filteredArray})
            return filteredArray
        })
        this.setState({hardArray})

        // embedUsers.forEach(myFunction);
        //     function myFunction(item){
        //      for(var id in item){
        //         console.log("another array with objects",item[id])
        //         // API.getAll(`exercises?${exerciseId}`)
        //         // for( var key in item )
        //     }}
        })
        API.getAll("exercises?")
        .then(exercises => {this.setState({ exercises })})
        .then(()=>{
            // console.log("hardArray",this.state.hardArray)
            let completeCounter=0
            let stuckCounter=0
            let keyCounter = 0
            
            let arrayToPass = this.state.hardArray.map(softItem =>{
                // console.log("exercise.id",exercise.id)
                //find(exercise.id) on exercies id
                 this.state.exercises.find(function(element){
                   let exerId = element.id
                //    console.log("exerId",exerId,element.name, "softItem", softItem.exerciseId)
                   if(exerId === softItem.exerciseId){
                       console.log("matched",exerId,softItem.exerciseId, "feedback",softItem.feedBack,"softItem",softItem )
                       arrayToPass={
                       feedback:softItem.feedBack || "",
                        exerciseName:element.name,
                        numberOfCompletes:completeCounter,
                        numberOfStucks:stuckCounter,
                        key:keyCounter
                       }
                       keyCounter+=1
                       if(softItem.complete === true){
                           completeCounter += 1 
                        }
                        if(softItem.stuck === true){
                            stuckCounter += 1 
                            // console.log("arrayToPass",arrayToPass)
                        }
                    }
                })
                return arrayToPass 
            }
        )//end of hard Array map
        console.log("arrayToPass",arrayToPass)
        this.setState({arrayToPass})
    })
    
            //     const mergedArray=[]
            //     if(filteredArray.exerciseId===exercisesEmbed.id){
                //         mergedArray.name = 
                //     }
                // })
            }
            //build an array from exercises, add a property for complete and stucks. Loop through student exercises for each one incerement complete or stuck key value for the exercise object in the exercises array that matches the exercise id in the student exercise object(use array.find)
            
            render(){
                // console.log("hardArray",this.state.hardArray)
                return(
                    <React.Fragment>
            <h1>TESTING</h1>
            <Navbar/>
            <div className ="flexBox-container" >
            {this.state.arrayToPass.map(exercise => (
                // this.state.filteredArray.map(fArray=>(
                    
                    <ByExerciseCard
                    key={exercise.key}
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
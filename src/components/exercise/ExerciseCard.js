import React, { Component } from "react";
import API from "../../APIManger";
import { Collapse } from 'reactstrap';
export default class ExerciseCard extends Component{
state ={
    studentExercises:[],
    collapse:false,
    feedback:"",
    conditionGreen:false
}

//add studentExercise properties
toggle() {
    this.setState({ collapse: !this.state.collapse });
  }
//   componentDidMount() {
//     let studentId  = JSON.parse(sessionStorage.getItem("currentUser"));
//       API.getAll(`studentExercises?studentId=${studentId}`)
//     //   http://localhost:5002/studentExercises?studentId=1
//       .then(studentExercises => this.setState({ studentExercises }))
//     }
    handleFieldChange = evt => {
        console.log("inside handle field change")
      const stateToChange = {};
      stateToChange[evt.target.id] = evt.target.value;
      this.setState(stateToChange);
    };
    handlePatch = e =>{
        
        e.preventDefault()
        console.log("inside patch")
        const patchGithubLink={githubLink:this.state.githubLink}
        
        API.patchItem("studentExercises",`${this.props.studentExercises.id}`, patchGithubLink).then(console.log(patchGithubLink))
    }
    handleChecked = (evt,checkbox) =>{
        // let studentId  = JSON.parse(sessionStorage.getItem("currentUser"));
        // if(checkbox === "checkBox1"){
            
            //     this.setState({checkBox1:!this.state.checkBox1})
            //     // set state value = opposite of current value
            // }
            // console.log("state",this.state.studentExercises)
            //   stateToChange.studentExercises[evt.target.id]= this.state.checkBox1;
            console.log("checkbox",checkbox)
            if(checkbox==="complete"){
                const stateToChange = {...this.state.studentExercises, [checkbox]:!this.state.studentExercises[checkbox]};
            this.setState({
                            studentExercises:stateToChange,
                            conditionGreen: !this.state.condition
                        });
            API.patchItem("studentExercises",`${this.props.studentExercises.id}`, stateToChange)
        }
    }//end of if
        handleEditPatch = e =>{
            e.preventDefault()
            // let studentId  = JSON.parse(sessionStorage.getItem("currentUser"));
            console.log("studentExercises", this.props.studentExercises.exercise.id)
            const patchFeedback={feedback:this.state.feedback}
            // API.patchItem("studentExercises",`${studentId}`, patchFeedback).then(console.log(patchFeedback))
            // API.getOneRoute(`studentExercises/${this.props.studentExercises.id}`).then(console.log(patchFeedback)).then(()=>
            API.patchFeedback(`studentExercises/${this.props.studentExercises.id}`, patchFeedback).then(console.log(patchFeedback))
         
        // )
    }
    render(){
        
        return (
            <div className="card" style={{width: `22rem`}}>
                <div className="card-body">
                    <h5 className= {this.state.conditionGreen?"card-header green":"card-header"}
                     onClick={this.toggle.bind(this)}> 
                    {/* bind this instance of this to this.toggle, change className on toggle of checkboxes */}
                        {this.props.studentExercises.exercise.name}
                    </h5>
                    <Collapse isOpen={this.state.collapse}>
                    <div className="control">
                     <label htmlFor="url">GitHub Repo URL:</label>
                        <input type="url" name="url" id="githubLink"
                            placeholder="https://example.com"
                            pattern="https://.*" 
                            size="18" 
                            onChange={this.handleFieldChange} 
                            required />
               <button type="button" 
                        className="btn btn-dark btn-sm"
                        onClick = {this.handlePatch} >
                        Add GitHub Repo
                        </button>
               <div>
               <label htmlFor="completeBox">Complete</label>

               <input type="checkbox" 
                        name ="completeBox" 
                        id = "complete"
                        onChange={(e)=>this.handleChecked(e,"complete")}
                        checked ={this.state.studentExercises.complete||false}
                        />

               <label htmlFor="stuckBox" >Stuck</label>

               <input type="checkbox" 
                        name ="stuckBox" 
                        id ="stuck" 
                        onChange={(e)=>this.handleChecked(e,"stuck")}
                        checked ={this.state.studentExercises.stuck||false}
                        />
               </div>
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">Feedback</span>
                </div>
                <textarea 
                            className="form-control" 
                            aria-label="Feedback" 
                            id="feedback"
                            onChange={this.handleFieldChange}
                            >
                </textarea>

            </div>
                <button type="button" 
                className="btn btn-dark btn-sm"
                onClick = {this.handleEditPatch.bind(this)}
                >Submit Feedback
                </button>
        </div>
        </Collapse>        
                    
     </div>
    </div>
    
        )
    
    }
}
import React, { Component } from "react";
import API from "../../APIManger";
export default class ExerciseCard extends Component{
state ={
    studentExercises:[]
}
componentDidMount() {
    API.getOne("studentExercises","0")
    .then(studentExercises => this.setState({ studentExercises }))
  }
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
        API.patchItem("studentExercises","0", patchGithubLink).then(console.log(patchGithubLink))
    }
    handleChecked = evt =>{
    const stateToChange = {};
      stateToChange[evt.target.id] = true;
      this.setState(stateToChange);
      API.patchItem("studentExercises","0", stateToChange).then(console.log(stateToChange))
    }
    handleEditPatch = e =>{
        e.preventDefault()
        console.log("inside feedback patch")
        const patchFeedback={feedback:this.state.feedback}
        API.patchItem("studentExercises","0", patchFeedback).then(console.log(patchFeedback))
    }

    render(){
        return (
            <div className="card" style={{width: `22rem`}}>
                <div className="card-body">
                    <h5 className="card-header">
                        {this.props.exercise.name}
                    </h5>
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
                        onChange={this.handleChecked}
                        />

               <label htmlFor="stuckBox" >Stuck</label>

               <input type="checkbox" 
                        name ="stuckBox" 
                        id ="stuck" 
                        onChange={this.handleChecked}
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
                onClick = {this.handleEditPatch}
                >Submit Feedback
                </button>
        </div>
                    
                    
     </div>
    </div>
    
        )
    
    }
}
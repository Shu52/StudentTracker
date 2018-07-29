import React, { Component } from "react";
import API from "../../APIManger";
import { Collapse } from 'reactstrap';
export default class ExerciseCard extends Component{
state ={
    studentExercises:[],
    collapse:false
}
//add studentExercise properties
toggle() {
    this.setState({ collapse: !this.state.collapse });
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
    handleChecked = (evt,checkbox) =>{
        // if(checkbox === "checkBox1"){

        //     this.setState({checkBox1:!this.state.checkBox1})
        //     // set state value = opposite of current value
        // }
    const stateToChange = {...this.state.studentExercises, [checkbox]:!this.state.studentExercises[checkbox]};
    // console.log("state",this.state.studentExercises)
    //   stateToChange.studentExercises[evt.target.id]= this.state.checkBox1;
      this.setState({studentExercises:stateToChange});
      API.patchItem("studentExercises","0", stateToChange).then(console.log(stateToChange))
    }
    handleEditPatch = e =>{
        e.preventDefault()
        // console.log("parent", e)
        const patchFeedback={feedback:this.state.feedback}
        API.patchItem("studentExercises","0", patchFeedback).then(console.log(patchFeedback))
    }

    render(){
        return (
            <div className="card" style={{width: `22rem`}}>
                <div className="card-body">
                    <h5 className="card-header" onClick={this.toggle.bind(this)}>
                        {this.props.exercise.name}
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
                onClick = {this.handleEditPatch}
                >Submit Feedback
                </button>
        </div>
        </Collapse>        
                    
     </div>
    </div>
    
        )
    
    }
}
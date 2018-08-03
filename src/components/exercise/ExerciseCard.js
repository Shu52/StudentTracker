import React, { Component } from "react";
import API from "../../APIManger";
import { Collapse,Card,CardBody,CardHeader,Button,Form, Label, Input, FormGroup,InputGroup, InputGroupText, InputGroupAddon, Container } from 'reactstrap';
export default class ExerciseCard extends Component{
state ={
    
    collapse:false,
    conditionGreen:false,
    feedback:this.props.studentExercises.feedback,
    complete:this.props.studentExercises.complete,
    stuck:this.props.studentExercises.stuck,
    githubLink:this.props.studentExercises.githubLink
    
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
            console.log("checkbox id is",checkbox)
            if(checkbox==="complete"){
                
                console.log("value of complete before change",this.state.complete)
                let stateToChange = {complete:!this.state.complete};
                
                this.setState({
                    complete:!this.state.complete,
                    // conditionGreen: !this.state.condition
                });
                API.patchItem("studentExercises",`${this.props.studentExercises.id}`, stateToChange)
            }//end of if
            if(checkbox==="stuck"){
                
                console.log("value of stuck before change",this.state.stuck)
                let stateToChange = {stuck:!this.state.stuck};
                
                this.setState({
                    stuck:!this.state.stuck,
                    // conditionGreen: !this.state.condition
                });
                API.patchItem("studentExercises",`${this.props.studentExercises.id}`, stateToChange)
            }
        }
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
            console.log("render complete",this.state.complete)
            
            return (

<Container>
    <Card>
        <CardBody>
                <CardHeader className= {this.state.conditionGreen?"card-header green":""}
                                onClick={this.toggle.bind(this)}> 
                    {/* bind this instance of this to this.toggle, change className on toggle of checkboxes */}
                        {this.props.studentExercises.exercise.name}
                </CardHeader>
            <Collapse isOpen={this.state.collapse}>
                <Form >
                    <FormGroup>
                    <InputGroup>
                    <InputGroupAddon addonType="prepend">
                <InputGroupText>GitHub Repo URL:</InputGroupText>
            </InputGroupAddon>
                        <Input type="url" 
                            name="url" 
                            id="githubLink"
                            placeholder={this.props.githubLink}
                            value={this.state.githubLink}
                            // pattern="https://.*" 
                            size="18" 
                            onChange={this.handleFieldChange} 
                            required 
                            />
                            </InputGroup>
                    </FormGroup>
               <Button type="button" 
                        className="btn btn-dark btn-sm"
                        onClick = {this.handlePatch} >
                        Add GitHub Repo
                        </Button>
               <FormGroup check>
               <Label for="completeBox">

               <Input type="checkbox" 
                        checked ={this.state.complete?"green":""}
                        name ="completeBox" 
                        id = "complete"
                        onChange={(e)=>this.handleChecked(e,"complete")}
                        />{' '}
                    Complete
                 </Label>   
                 <br/>   
               <Label check for="stuckBox" >

               <Input type="checkbox" 
                        name ="stuckBox" 
                        id ="stuck" 
                        onChange={(e)=>this.handleChecked(e,"stuck")}
                        checked ={this.state.stuck}
                />{' '}
                Stuck 
                </Label>
                        </FormGroup>

            
                
        <FormGroup>
            <InputGroup>
             <InputGroupAddon addonType="prepend">
                <InputGroupText>Feedback</InputGroupText>
            </InputGroupAddon>
                <Input      type="textarea" 
                            name="text" 
                            className="form-control" 
                            aria-label="Feedback" 
                            id="feedback"
                            onChange={this.handleFieldChange}
                            value={this.state.feedback}
                            placeholder={this.props.feedback}  />
            </InputGroup>
        </FormGroup>

            
                <Button type="button" 
                        className="btn btn-dark btn-sm"
                        onClick = {this.handleEditPatch.bind(this)}>
                        Submit Feedback
                </Button>
            </Form>
        </Collapse>            
     </CardBody>
    </Card>
</Container>
    
        )
    
    }
}
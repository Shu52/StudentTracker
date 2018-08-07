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

    toggle() {
        this.setState({ collapse: !this.state.collapse });
}
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };
    handlePatch = e =>{
        e.preventDefault()
        const patchGithubLink={githubLink:this.state.githubLink}
        API.patchItem("studentExercises",`${this.props.studentExercises.id}`, patchGithubLink)
    }
    handleChecked = (evt,checkbox) =>{
            if(checkbox==="complete"){

                let stateToChange = {complete:!this.state.complete};
                this.setState({
                    complete:!this.state.complete,
                });
                API.patchItem("studentExercises",`${this.props.studentExercises.id}`, stateToChange)
            }//end of if
            if(checkbox==="stuck"){
                let stateToChange = {stuck:!this.state.stuck};
                this.setState({
                    stuck:!this.state.stuck,
                });
                API.patchItem("studentExercises",`${this.props.studentExercises.id}`, stateToChange)
            }
        }
        handleEditPatch = e =>{
            e.preventDefault()
            const patchFeedback={feedback:this.state.feedback}
            API.patchFeedback(`studentExercises/${this.props.studentExercises.id}`, patchFeedback)           
            }
    render(){ 
                   
            return (
            <Container>
                <Card>
                    <CardBody>
                            <CardHeader onClick={this.toggle.bind(this)}> 
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
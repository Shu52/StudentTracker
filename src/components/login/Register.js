import React, { Component } from "react"
import API from "../../APIManger"
import { Button, Form, FormGroup, Label, Input, ButtonGroup } from 'reactstrap';

export default class Register extends Component {
    state = {
        name: "",
        password: "",
        exercises:[],
        studentId:"",
        exerciseId: 0,
        githubLink: "",
        complete: false,
        stuck: false,
        feedback: "",
        instructor:false,
        cohort:0
    }

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }
    onRadioBtnClick= (num) =>{
        if(num===1){this.setState({instructor:false})}
        if(num===2){this.setState({instructor:true})}
        }
    registerUser =(e) =>{
        e.preventDefault()
        API.checkOne(`users?name=${this.state.name.toLocaleLowerCase()}`).then(user =>{  
            console.log("instructor?",user, "state instructor", this.state.instructor)
            //will be undefined if new user     
            if(!this.state.instructor) {
                API.postUser({
                    name: this.state.name.toLowerCase(),
                    password: this.state.password,
                    cohort:this.state.cohort,
                    instructor:this.state.instructor
                })
                .then(e => e.json())
                .then((response)=>{
                    sessionStorage.setItem("currentUser", response.id)            
                    sessionStorage.setItem(
                        "credentials",
                        JSON.stringify({
                            name: this.state.name,
                            password: this.state.password,
                            instructor:this.state.instructor
                        })
                    )
                })
                //beginning of create studentExercises
                .then(()=>{
                    API.getAll("exercises")
                    .then((exercises)=>{                
                        let studentId  = JSON.parse(sessionStorage.getItem("currentUser"));
                        let fetchArray =  exercises.map((exercise)=>{
                            let studentExercises = {
                                userId:studentId,
                                exerciseId:exercise.id,
                                githubLink: "",
                                complete: false,
                                stuck: false,
                                feedback: ""
                            }  
                            return fetch("https://nss-student-tracker.herokuapp.com/studentExercises", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(studentExercises)
                            })
                        })//end of map

                    Promise.all(fetchArray).then(files=>{                    
                        files.forEach (file=>{(file.json());
                            })
                        })
                        .then(()=>{
                            this.props.history.push("/");
                        })
                        .catch((error)=>console.log(error))                
                    })//end of .then(exercises)                                    
                })//end of create student exercises 
            }//end of if
                else if(user.length > 0){
                    if (this.state.name.toLowerCase() === user[0].name ){
                            alert("User name is already registered or no username entered, try again")
                            this.props.history.push("/");
                            return
                        }
                }
                 else if( this.state.name.length > 0 && this.state.instructor === true) {
                    API.postUser({
                        name: this.state.name.toLowerCase(),
                        password: this.state.password,
                        cohort:this.state.cohort,
                        instructor:this.state.instructor
                    })
                    .then(e => e.json())
                    .then((response)=>{
                        sessionStorage.setItem("currentUser", response.id)            
                        sessionStorage.setItem(
                            "credentials",
                            JSON.stringify({
                                name: this.state.name,
                                password: this.state.password,
                                instructor:this.state.instructor
                            })
                        )
                        this.props.history.push("/");
                    })
                }//end of else
            })// end of checkOne
            this.props.history.push("/");
    }//end of register student 
    render() {
        return (
            <React.Fragment>
                <Form  className = "loginForm" onSubmit={ this.registerUser}>
                    <h1 className="h1-header">Please Register</h1>
                    <div className="form-styling">
                <FormGroup>
                    <Label htmlFor="inputName">Display Name</Label>
                    <Input onChange={this.handleFieldChange} type="name"
                        id="name"
                        placeholder="Display Name"
                        required="" autoFocus="" />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="inputPassword">Password</Label>
                    <Input onChange={this.handleFieldChange} type="password"
                        id="password"
                        placeholder="Password"
                        required="" />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="inputCohort">Cohort #</Label>
                    <Input onChange={this.handleFieldChange} type="number"
                        id="cohort"
                        placeholder="cohort #"
                        required="" />
                </FormGroup>
                    <div><span><strong>Role</strong></span></div>
                <ButtonGroup className = "radioBtns">
                    <Button id = "student" onClick={() => this.onRadioBtnClick(1)}>Student</Button>
                    <Button id = "instructor" onClick={() => this.onRadioBtnClick(2)} >Instructor</Button>
                </ButtonGroup>
                    <div className = "loginButtons">
                        <Button type="submit" 
                                className="btn btn-warm"
                                id ="registerBtn" 
                                >
                                Register Account
                        </Button>
                    </div>
                </div>
                </Form>
            </React.Fragment>
        )
    }
}
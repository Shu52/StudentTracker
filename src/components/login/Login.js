import React, { Component } from "react"
import API from "../../APIManger"
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
// , UncontrolledAlert

export default class Login extends Component {

    // Set initial component state
    state = {
        name: "",
        password: "",
        exercises:[],
        studentId:"",
        exerciseId: 0,
        githubLink: "",
        complete: false,
        stuck: false,
        feedback: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }
    
    // Simplistic handler for login submit
    handleLogin = (e) => {
        API.checkOne(`students?name=${this.state.name}`).then(student =>{
            if(student.length === 0 || student[0].name.toLowerCase() !== this.state.name){
                alert("Empty value or unregistered user, Please Register")
                return
               
            }
            if(student.length === 0 || student[0].password !== this.state.password){
                alert("Empty value or incorrect password, try again" )
            }
            else if(student[0].name.toLowerCase() === this.state.name && student[0].password === this.state.password)
            {
                sessionStorage.setItem("currentUser", student[0].id)
                sessionStorage.setItem(
                    "credentials",
                    JSON.stringify({
                        name: this.state.name,
                        password: this.state.password
                    })
                )
                this.props.history.push("/");
            }
        }) 
        this.props.history.push("/");
    }
    registerStudent =(e) =>{
        API.checkOne(`students?name=${this.state.name.toLocaleLowerCase()}`).then(student =>{         
            if( student.length === 0) {
                
                API.postStudent({
                    name: this.state.name.toLowerCase(),
                    password: this.state.password
                })
                .then(e => e.json())
                .then((response)=>{
                    sessionStorage.setItem("currentUser", response.id)            
                    sessionStorage.setItem(
                        "credentials",
                        JSON.stringify({
                            name: this.state.name,
                            password: this.state.password
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
                                studentId:studentId,
                                exerciseId:exercise.id,
                                githubLink: "",
                                complete: false,
                                stuck: false,
                                feedback: ""
                            }  
                            
                            
                            // return ()=>API.postStudentExercises(studentExercises)
                            return fetch("http://localhost:5002/studentExercises", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(studentExercises)
                            })
                        })//end of map
                        
                        
                        Promise.all(fetchArray).then(files=>{                    
                            files.forEach (file=>{
                                (file.json());
                            })
                        })
                        .then(()=>{
                            const stateToChange ={tableBuilt:!this.props.tableBuilt}
                            this.props.tableBuiltToggle(stateToChange)
                            this.props.history.push("/");
                        })
                        .catch((error)=>console.log(error))                
                    })//end of .then(exercises)                                    
                })//end of create student exercises 
            }//end of else
                else if(this.state.name.toLowerCase() === student[0].name){
                    alert("User name is already registered or no username entered, try again")
                    this.props.history.push("/");
                    return
                }
        })// end of checkOne
    }//end of register student   
    
    render() {
        return (
            <React.Fragment>
                <Form  className = "loginForm" onSubmit={this.handleLogin}>
                
                <h1 className="h1-header">Please sign in or Register</h1>
            <div className="form-styling">
            <FormGroup>
                <Label htmlFor="inputName">
                    Display Name
                </Label>

                <Input onChange={this.handleFieldChange} type="name"
                       id="name"
                       placeholder="Display Name"
                       required="" autoFocus="" />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="inputPassword">
                    Password
                </Label>

                <Input onChange={this.handleFieldChange} type="password"
                       id="password"
                       placeholder="Password"
                       required="" />
            </FormGroup>
            <div className = "loginButtons">
                <Button type="submit"
                        className="btn btn-warm"
                        id ="signInBtn">
                        Sign in
                </Button>

                <Button type="button" 
                        className="btn btn-warm"
                        id ="registerBtn" 
                        onClick = {(e) => this.registerStudent(e)}>
                        Register Account
                </Button>
            </div>
            </div>
            </Form>
            </React.Fragment>
        )
    }
}
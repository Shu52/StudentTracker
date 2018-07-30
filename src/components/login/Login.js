import React, { Component } from "react"
import API from "../../APIManger"

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
        feedback: "",
        counter: 0
    }

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    // Simplistic handler for login submit
    handleLogin = (e) => {
        e.preventDefault()

        /*
            For now, just store the name and password that
            the customer enters into local storage.
        */
       API.checkOne(`students?name=${this.state.name}`).then(student =>{
           if(student.length === 0 || student[0].name !== this.state.name){
               alert("Empty value or incorrect/unregistered student, try again")
               return
           }
           if(student.length === 0 || student[0].password !== this.state.password){
            alert("Empty value or incorrect password, try again")
            return
        }
           else if(student[0].name === this.state.name && student[0].password === this.state.password)
           {
            sessionStorage.setItem("currentUser", student[0].id)
            console.log("currentUser id", student[0].id, "currentUserName", student[0].name)
            localStorage.setItem(
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
        e.preventDefault();
        //call to post student
        API.postStudent({
            name: this.state.name,
            password: this.state.password
        })
        .then(e => e.json())
        .then((response)=>{
           sessionStorage.setItem("currentUser", response.id)
            console.log("responseId", response.id)

            localStorage.setItem(
                "credentials",
                JSON.stringify({
                    name: this.state.name,
                    password: this.state.password
                })
            )
            this.props.history.push("/");
        })
        //beginning of create studentExercises
        .then(()=>{
            console.log("inside of create studentExercises")
            API.getAll("exercises")
            
            .then((exercises)=>{
                console.log("after exercises set state")
                
                exercises.map((exercise)=>{
                    console.log("inside map")
                        let studentId  = JSON.parse(sessionStorage.getItem("currentUser"));
                        // studentId = studentId;
                        console.log("studentId", studentId)
                        let studentExercises = {
                            studentId:studentId,
                            exerciseId:exercise.id,
                            githubLink: "",
                            complete: false,
                            stuck: false,
                            feedback: ""
                        }    
                        API.postStudentExercises(studentExercises)                                    
                        
                    
                    }
                )
            }
                )
            }
        )
            
        }


    render() {
        return (
            <React.Fragment>
            <form onSubmit={this.handleLogin}>
                <h1 className="h3 mb-3 font-weight-normal text-center">Please sign in or Register</h1>
                <label htmlFor="inputName">
                    Display Name
                </label>
                <input onChange={this.handleFieldChange} type="name"
                       id="name"
                       placeholder="Display Name"
                       required="" autoFocus="" />
                <label htmlFor="inputPassword">
                    Password
                </label>
                <input onChange={this.handleFieldChange} type="password"
                       id="password"
                       placeholder="Password"
                       required="" />
                <button type="submit" className="btn btn-primary">
                    Sign in
                </button>
                <button type="button" className="btn btn-warning" onClick = {(e) => this.registerStudent(e)}>Register Account</button>
            </form>
            </React.Fragment>
        )
    }
}
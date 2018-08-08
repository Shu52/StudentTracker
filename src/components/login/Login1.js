import React, { Component } from "react"
import API from "../../APIManger"
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from "react-router-dom"

export default class Login extends Component {
state={
    name: "",
    password: "",
    instructor:""
}

handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
}
handleLogin = (e) => {
    API.checkOne(`users?name=${this.state.name.toLowerCase()}`).then(student =>{
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
                    password: this.state.password,
                    instructor:this.state.instructor
                })
            )
            this.props.history.push("/");
        }
    }) 
    this.props.history.push("/");
}

    render() {
        return (
            <React.Fragment>
                <Form  className = "loginForm" onSubmit={this.handleLogin}>
                
                <h1 className="h1-header">Please sign in</h1>
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
                {
                    <Link className="card-link"
                    to={{
                        pathname: `/register`,
                        
                    }}>
                        Need to Register?
                    </Link>
                }
               
            </div>
            </div>
            </Form>
            </React.Fragment>
        )
    }


}//end of class
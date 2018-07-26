import React, { Component } from "react"
import API from "../../APIManger"

export default class Login extends Component {

    // Set initial component state
    state = {
        name: "",
        password: ""
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
        localStorage.setItem(
            "credentials",
            JSON.stringify({
                name: this.state.name,
                password: this.state.password
            })
        )
        this.props.history.push("/");
    }
    registerStudent =(e) =>{
        e.preventDefault();
        //call to post student
        API.postStudent({
            name: this.state.name,
            password: this.state.password
        })
        .then(()=>{
            console.log("inside .then")
            localStorage.setItem(
                "credentials",
                JSON.stringify({
                    name: this.state.name,
                    password: this.state.password
                })
            )
            this.props.history.push("/");
        })
    }

    render() {
        return (
            <form onSubmit={this.handleLogin}>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in or Register</h1>
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
        )
    }
}
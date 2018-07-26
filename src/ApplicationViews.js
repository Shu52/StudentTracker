import { Route } from "react-router-dom";
import React, { Component } from "react";
import Login from "./components/login/Login"
import StudentView from "./components/student/StudentView"


export default class ApplicationViews extends Component {
    // Check if credentials are in local storage
      isAuthenticated = () => localStorage.getItem("credentials") !== null
    
      render() {
        return (
          <React.Fragment>
            <Route exact path="/" render={props => {
        if (this.isAuthenticated()) {
            return <StudentView />
        } else {
            return <Login {...props}/>
        }
    }} />
    <Route path ="/studentView" render={props => {
            return <StudentView/>
        }
    }
        />
    <Route path="/login" component={Login} />
        
        </React.Fragment>
        )//end of return
    }//end of render
}//end of class
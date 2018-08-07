import { Route } from "react-router-dom";
import React, { Component } from "react";
import Login from "./components/login/Login"
import StudentView from "./components/student/StudentView"
import CompleteView from "./components/student/CompleteView"
import StuckView from "./components/student/StuckView"
// import { Nav, NavItem, NavLink } from 'reactstrap';
export default class ApplicationViews extends Component {
        state ={
            
        }

tableBuiltToggle = (stateToChange)=>{    
        this.setState({tableBuilt:stateToChange})
    }
      isAuthenticated = () => sessionStorage.getItem("credentials") !== null
    
      render() {
        return (
          <React.Fragment>
            <Route exact path="/" render={props => {
        if (this.isAuthenticated()) {
            return <StudentView  />
        } else {
            return <Login {...props} />
        }
    }} />
        <Route path="/completed" render={(props) => {
            console.log("props",props)
    return <CompleteView {...props} />
        }}/>
        <Route path="/stucks" render={(props) => {
            console.log("props",props)
    return <StuckView {...props} />
        }}/>
          </React.Fragment>
        )//end of return
    }//end of render
}//end of class
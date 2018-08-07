import { Route } from "react-router-dom";
import React, { Component } from "react";
import Login from "./components/login/Login"
import StudentView from "./components/student/StudentView"
import CompleteView from "./components/student/CompleteView"
import StuckView from "./components/student/StuckView"
import InstructorView from "./components/instructor/InstructorView"
import ByStudent from "./components/instructor/ByStudent";
// import { Nav, NavItem, NavLink } from 'reactstrap';
export default class ApplicationViews extends Component {
      isAuthenticated = () => sessionStorage.getItem("credentials") !== null
      isInstructor = ()=>JSON.parse(sessionStorage.getItem("credentials")).instructor === true

       
      render() {
        return (
          <React.Fragment>
            <Route exact path="/" render={props => {
        if (this.isAuthenticated()&& !this.isInstructor()) {
            return <StudentView  />
        }  else if (this.isAuthenticated()&& this.isInstructor()) {
            return <InstructorView  />
        }else {
            return <Login {...props} />
        }
    }} />


        <Route path="/completed" render={(props) => {    
            return <CompleteView {...props} />
        }}/>

        <Route path="/stucks" render={(props) => {
            return <StuckView {...props} />
        }}/>

        <Route path="/byStudent" render={(props) => {    
            return <ByStudent {...props} />
        }}/>
          </React.Fragment>
        )//end of return
    }//end of render
}//end of class
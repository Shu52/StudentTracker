import { Route } from "react-router-dom";
import React, { Component } from "react";
import Login from "./components/login/Login"
import StudentView from "./components/student/StudentView"

//set state here pass into login, login will pass to studentview tablebuilt:boolean write function for table built
export default class ApplicationViews extends Component {
        state ={
            tableBuilt: false
        }

tableBuiltToggle = (stateToChange)=>{    
        this.setState({tableBuilt:stateToChange})
        console.log("Table from function", stateToChange)
    }


    // Check if credentials are in local storage
      isAuthenticated = () => sessionStorage.getItem("credentials") !== null
    
      render() {
        return (
          <React.Fragment>
            <Route exact path="/" render={props => {
        if (this.isAuthenticated()) {
            return <StudentView tableBuilt={this.state.tableBuilt} />
        } else {
            return <Login {...props} tableBuilt={this.state.tableBuilt} tableBuiltToggle ={this.tableBuiltToggle}/>
        }
    }} />
    {/* <Route path ="/studentView" render={props => {
            return <StudentView/>
        }
    }
        />
    <Route path="/login" component={Login} /> */}
        
        </React.Fragment>
        )//end of return
    }//end of render
}//end of class
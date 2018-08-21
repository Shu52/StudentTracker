import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class NavBarInstructor extends Component {
 state = {
    dropdownOpen: false,
    cohortNumber:0,
    dropdownOpen1:false
    
  };
  //passed in method, on click call method
  getCohortNumber = (evt) => {
    const stateToChange={cohortNumber:evt.target.value}
    console.log(stateToChange)
    this.setState(stateToChange)
}
  toggle() {
    this.setState({dropdownOpen: !this.state.dropdownOpen});
  }
  toggle1() {
    this.setState({dropdownOpen1: !this.state.dropdownOpen1});
  }
  events = evt => {
    console.log("events",evt)
  }

  render() {
    return (
      <div className ="nav">
        <ButtonDropdown direction="left" isOpen={this.state.dropdownOpen} toggle={this.toggle.bind(this)}>
        <DropdownToggle outline color="danger" size="sm" caret>
          By Student
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header className= "student-dropdown-header">Cohort</DropdownItem>
          <Link to={{
            pathname: "/bystudent",
            state:{cohortNumber:25}
          }}>
          <DropdownItem className = "student-dropdown-item">Day 25</DropdownItem>
          </Link>
          <Link to={{
            pathname: "/bystudent",
            state:{cohortNumber:26}
          }}>
          <DropdownItem className = "student-dropdown-item">Day 26</DropdownItem>
          </Link>
          <Link to={{
            pathname: "/bystudent",
            state:{cohortNumber:27}
          }}>
          <DropdownItem className = "student-dropdown-item" >Day 27</DropdownItem>
          </Link>
          <DropdownItem divider />
          <Link to={{
            pathname: "/bystudent",
            state:{cohortNumber:7}
          }}>
          <DropdownItem className = "student-dropdown-item">Evening 7</DropdownItem>
          </Link>
          <Link to={{
            pathname: "/bystudent",
            state:{cohortNumber:8}
          }}>
          <DropdownItem className = "student-dropdown-item">Evening 8</DropdownItem>
          </Link>
          
        </DropdownMenu>
      </ButtonDropdown>
          <Link to="/" className="linkClass">Instructor View</Link>
      <ButtonDropdown direction="right" isOpen={this.state.dropdownOpen1} toggle={this.toggle1.bind(this)}>
        <DropdownToggle outline color="warning" size="sm" caret>
          By Exercise
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header className = "exercise-dropdown-header">Cohort</DropdownItem>
          <Link to={{
            pathname: "/byexercise",
            state:{cohortNumber:25}
          }}>
          <DropdownItem className ="exercise-dropdown-item ">Day 25</DropdownItem>
          </Link>
          <Link to={{
            pathname: "/byexercise",
            state:{cohortNumber:26}
          }}>
          <DropdownItem className ="exercise-dropdown-item " >Day 26</DropdownItem>
          </Link>
          <Link to={{
            pathname: "/byexercise",
            state:{cohortNumber:27}
          }}>
          <DropdownItem className ="exercise-dropdown-item " >Day 27</DropdownItem>
          </Link>
          <DropdownItem divider />
          <Link to={{
            pathname: "/byexercise",
            state:{cohortNumber:7}
          }}>
          <DropdownItem className ="exercise-dropdown-item ">Evening 7</DropdownItem>
          </Link>
          <Link to={{
            pathname: "/byexercise",
            state:{cohortNumber:8}
          }}>
          <DropdownItem className ="exercise-dropdown-item ">Evening 8</DropdownItem>
          </Link>
          
        </DropdownMenu>
      </ButtonDropdown>
      </div>
    );
  }
}
import React, { Component } from "react";

export default class StudentGreeting extends Component {
    Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
        }
   studentId  = JSON.parse(sessionStorage.getItem("credentials"));
render() {
    return (
    
        <h1 className ="blockquote text-center">You can do it,<strong> {this.Capitalize(this.studentId.name)} </strong>! We Believe in You!</h1>
    )}
}
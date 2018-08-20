import React, { Component } from "react";
import { Collapse,Card,CardBody,CardHeader,Container } from 'reactstrap';

export default class ByStudentCard extends Component{
state ={
    collapse:false

}
toggle() {
    this.setState({ collapse: !this.state.collapse });
}
render(){ 
        console.log("students in stud card",this.props.studentsCard)           
    return (
    <Container>
        <Card>
            <CardBody>
                    <CardHeader className ="center-me" onClick={this.toggle.bind(this)}> 
                            {this.props.studentsCard.name}
                    </CardHeader>
                <Collapse isOpen={this.state.collapse}>
                    <p># of Completes {this.props.studentsCard.numOfCompletes}</p>
                 <p> # of Stucks {this.props.studentsCard.numOfStucks}</p>
            </Collapse>            
        </CardBody>
        </Card>
    </Container>

)

}
}//end of class
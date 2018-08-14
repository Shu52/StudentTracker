import React, { Component } from "react";
import { Collapse,Card,CardBody,CardHeader,Container } from 'reactstrap';

export default class ByExerciseCard extends Component{
state ={
    collapse:false,
    filteredArray:this.props.filteredArray

}
toggle() {
    this.setState({ collapse: !this.state.collapse });
}
render(){ 
         console.log("exercises",this.props.exercises.exerciseName)          
    return (
    <Container>
        <Card>
            <CardBody>
                    <CardHeader onClick={this.toggle.bind(this)}> 
                    {this.props.exercises.exerciseName}
                    </CardHeader>
                <Collapse isOpen={this.state.collapse}>
                 <p># of Completes {this.props.exercises.numberOfCompletes}</p>
                 <p> # of Stucks {this.props.exercises.numberOfStucks}</p>
            </Collapse>       
        </CardBody>
        </Card>
    </Container>

)

}
}//end of class
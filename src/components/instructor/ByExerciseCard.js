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
        //  console.log("exercises",this.props.exercises.exerciseName)          
    return (
    <Container>
        <Card>
            <CardBody>
                    <CardHeader onClick={this.toggle.bind(this)}> 
                    {this.props.exercises.name}
                    </CardHeader>
                <Collapse isOpen={this.state.collapse}>
                 <p># of Completes {this.props.exercises.complete?this.props.exercises.complete:0 }</p>
                 <p> # of Stucks {this.props.exercises.stuck? this.props.exercises.stuck:0}</p>
            </Collapse>       
        </CardBody>
        </Card>
    </Container>

)

}
}//end of class
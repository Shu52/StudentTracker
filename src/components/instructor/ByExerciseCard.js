import React, { Component } from "react";
import { Collapse,Card,CardBody,CardHeader,Container } from 'reactstrap';

export default class ByExerciseCard extends Component{
state ={
    collapse:false

}
toggle() {
    this.setState({ collapse: !this.state.collapse });
}
render(){ 
                   
    return (
    <Container>
        <Card>
            <CardBody>
                    <CardHeader onClick={this.toggle.bind(this)}> 
                            {this.props.exercises.name}
                    </CardHeader>
                <Collapse isOpen={this.state.collapse}>
                    <div><h1>More Testing</h1></div>
            </Collapse>            
        </CardBody>
        </Card>
    </Container>

)

}
}//end of class
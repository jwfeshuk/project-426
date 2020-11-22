import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';


class SubmitReview extends Component {
    constructor(authentication) {
        super();
        this.authenticated = authentication;
    }

    render() {
        return (
            <div>
                <Card className="text-center" bg="dark" text="light">
                    <Card.Body>
                        <Card.Title style={{fontSize: '40px'}}>Find the Best (Or Worst) Professors On Campus</Card.Title>
                        <Card.Subtitle style={{fontSize: '25px'}}>Or Give Your Own Opinion</Card.Subtitle>
                        <Card.Text></Card.Text>
                            {this.props.authenticated
                            ?
                            <Button variant="secondary" href="/EditForm">Write A Review!</Button>
                            :
                            <Button variant="secondary" href="/Login">Login to Post Reviews</Button>
                            }
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
export default SubmitReview;
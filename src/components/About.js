import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, ListGroup } from 'react-bootstrap';

class About extends Component {
    render() {
        return (
            <Card>
                <Card.Title>Project Collaborators</Card.Title>
                <Card.Body>
                    <Card>
                        <Card.Title>John Feshuk</Card.Title>
                        <Card.Body>
                            John Feshuk is a junior Computer Science B.S. and Music double major. He is responsible for the NavBar and Login.
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Title>Adam Nguyen</Card.Title>
                        <Card.Body>
                            Adam is a junior Computer Science B.S. major. He is responsible for the framework and base of the website.
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Title>Andrew Myers</Card.Title>
                        <Card.Body>
                            Andrew is a junior Pre-med Biology B.S. major with Computer Science and Music minors. He is responsible for the homepage and submit form pages.
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Title>Jack Krupa</Card.Title>
                        <Card.Body>
                            Jack is a junior Computer Science B.A. major with Classical Humanities and History minors. He is responsible for the recent reviews component and much of the logic.
                        </Card.Body>
                    </Card>
                </Card.Body>
            </Card>
        )
    }
}
export default About
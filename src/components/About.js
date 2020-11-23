import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, ListGroup } from 'react-bootstrap';

class About extends Component {
    render() {
        return (
            <Card style={{backgroundColor: "#13294B", color:  "#ffffff"}}>
                <Card.Title className="text-center" style={{margin: "6px", fontSize: "30px", marginTop: "15px"}}>Project Collaborators</Card.Title>
                <Card.Body>
                    <Card style={{backgroundColor: "#97c0e6"}}>
                        <Card.Title  style={{margin: "15px", color: "#13294B", fontSize: "25px"}}>John Feshuk</Card.Title>
                        <Card.Body style={{margin: "15px", fontSize: "15px"}}>
                            John Feshuk is a junior Computer Science B.S. and Music double major. He is responsible for the NavBar and Login.
                        </Card.Body>
                    </Card>
                    <Card style={{backgroundColor: "#97c0e6"}}>
                        <Card.Title style={{margin: "15px", color: "#13294B", fontSize: "25px"}}>Adam Nguyen</Card.Title>
                        <Card.Body style={{margin: "15px", fontSize: "15px"}}>
                            Adam is a junior Computer Science B.S. major. He is responsible for the framework and base of the website.
                        </Card.Body>
                    </Card>
                    <Card style={{backgroundColor: "#97c0e6"}}>
                        <Card.Title  style={{margin: "15px", color: "#13294B", fontSize: "25px"}}>Andrew Myers</Card.Title>
                        <Card.Body style={{margin: "15px", fontSize: "15px"}}>
                            Andrew is a junior Pre-med Biology B.S. major with Computer Science and Music minors. He is responsible for the homepage and submit form pages.
                        </Card.Body>
                    </Card>
                    <Card style={{backgroundColor: "#97c0e6"}}>
                        <Card.Title  style={{margin: "15px", color: "#13294B", fontSize: "25px"}}>Jack Krupa</Card.Title>
                        <Card.Body style={{margin: "15px", fontSize: "15px"}}>
                            Jack is a junior Computer Science B.A. major with Classical Humanities and History minors. He is responsible for the recent reviews component and much of the logic.
                        </Card.Body>
                    </Card>
                </Card.Body>
            </Card>
        )
    }
}
export default About
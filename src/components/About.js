import Review from "../Review";
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, ListGroup } from 'react-bootstrap';

class About extends Component {
    render() {
        return (
            <Card>
                <Card.Title>Project Collaborators</Card.Title>
                <Card.Body>
                    <ListGroup>
                        <ListGroup.Item><Card>
                            <Card.Title>John Feshuk</Card.Title>
                            <Card.Body>

                            </Card.Body>
                        </Card></ListGroup.Item>
                        <ListGroup.Item><Card>
                            <Card.Title>Adam Nguyen</Card.Title>
                            <Card.Body>

                            </Card.Body>
                        </Card></ListGroup.Item>
                        <ListGroup.Item><Card>
                            <Card.Title>Andrew Myers</Card.Title>
                            <Card.Body>

                            </Card.Body>
                        </Card></ListGroup.Item>
                        <ListGroup.Item><Card>
                            <Card.Title>Jack Krupa</Card.Title>
                            <Card.Body>

                            </Card.Body>
                        </Card></ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        )
    }
}
export default About
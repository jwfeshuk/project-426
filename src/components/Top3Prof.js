import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, ListGroup, Row, Container } from 'react-bootstrap';
import TopProf from './TopProf';

class Top3Prof extends Component {
    render() {
        return (
            <Card>
                {this.props.rating 
                ?<Card.Header>Top Rated Professors</Card.Header>
                :<Card.Header>Hardest Professors</Card.Header>
                }
                <ListGroup  variant="flush">
                    <ListGroup.Item style={{width: "300px"}}><TopProf rating={this.props.rating} num={0}/></ListGroup.Item>
                    <ListGroup.Item ><TopProf rating={this.props.rating} num={1}/></ListGroup.Item>
                    <ListGroup.Item ><TopProf rating={this.props.rating} num={2}/></ListGroup.Item>
                </ListGroup>
            </Card>
        )
    }
}

export default Top3Prof;
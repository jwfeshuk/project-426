import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Spinner, ListGroup } from 'react-bootstrap';
import { app } from '../base';
import ReviewCard from './ReviewCard'

class RecentReviews extends Component {
    render() {
        return(
            <Card style={{marginTop: "8px"}}>
                <Card.Header className="text-center" style={{backgroundColor: "#13294B", color: "#ffffff", fontSize: "28px"}}>Recent Reviews</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item style={{backgroundColor: "#97c0e6"}}>{(typeof this.props.recents == "undefined")
                                                                            ?<Spinner animation="border" role="status" />
                                                                            :<ReviewCard review={this.props.recents[0]}></ReviewCard>}</ListGroup.Item>
                    <ListGroup.Item style={{backgroundColor: "#97c0e6"}}>{(typeof this.props.recents == "undefined")
                                                                            ?<Spinner animation="border" role="status" />
                                                                            :<ReviewCard review={this.props.recents[1]}></ReviewCard>}</ListGroup.Item>
                    <ListGroup.Item style={{backgroundColor: "#97c0e6"}}>{(typeof this.props.recents == "undefined")
                                                                            ?<Spinner animation="border" role="status" />
                                                                            :<ReviewCard review={this.props.recents[2]}></ReviewCard>}</ListGroup.Item>
                </ListGroup>
            </Card>
        )
    }
}

export default RecentReviews;
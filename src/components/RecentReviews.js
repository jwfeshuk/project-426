import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, ListGroup } from 'react-bootstrap';
import { app } from '../base';
import ReviewCard from './ReviewCard'

class RecentReviews extends Component {
    constructor() {
        super();
        this.state = {
            recents: []
        }

        app.firestore().collection("/reviews").orderBy('lastUpdated').limit(3).get()
            .then((reviews) => {
                let temp = []
                reviews.forEach((review) => {
                    let recent = review.data()
                    temp.push(recent)
                })
                this.setState({recents: temp})
            }).catch((error) => {
                console.log(error)
            })
    }
    
    render() {
        console.log(this.state)
        return(
            <Card>
                <Card.Header className="text-center" style={{backgroundColor: "#13294B", color: "#ffffff"}}>Recent Reviews</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item style={{backgroundColor: "#97c0e6"}}><ReviewCard review={this.state.recents[0]}/></ListGroup.Item>
                    <ListGroup.Item style={{backgroundColor: "#97c0e6"}}><ReviewCard review={this.state.recents[1]}/></ListGroup.Item>
                    <ListGroup.Item style={{backgroundColor: "#97c0e6"}}><ReviewCard review={this.state.recents[2]}/></ListGroup.Item>
                </ListGroup>
            </Card>
        )
    }
}

export default RecentReviews;
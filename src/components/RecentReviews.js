import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, ListGroup } from 'react-bootstrap';
import { app } from '../base';
import ReviewCard from './ReviewCard'

class RecentReviews extends Component {
    render() {
        let reviewsArray = []
        
        app.firestore().collection("/reviews").orderBy('lastUpdated').limit(3).get().then((reviews) => {
            reviews.forEach((review) => {
                reviewsArray.push(review)
            })
        }).catch((error) => {
            console.log(error)
        })

        return(
            <Card>
                <Card.Header className="text-center" style={{backgroundColor: "#13294B", color: "#ffffff"}}>Recent Reviews</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item style={{backgroundColor: "#97c0e6"}}><ReviewCard input="1"/></ListGroup.Item>
                    <ListGroup.Item style={{backgroundColor: "#97c0e6"}}><ReviewCard input="2"/></ListGroup.Item>
                    <ListGroup.Item style={{backgroundColor: "#97c0e6"}}><ReviewCard input="3"/></ListGroup.Item>
                </ListGroup>
            </Card>
        )
    }
}

export default RecentReviews;
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Spinner, ListGroup } from 'react-bootstrap';
import { app } from '../base';
import ReviewCard from './ReviewCard'

class MyReviews extends Component {
    constructor() {
        super()

        this.state = {
            user: '',
            reviews: [],
            render: false
        }
    }

    componentDidMount() {
        app.firestore().collection("/users").doc(app.auth().currentUser.uid).get()
            .then((user) => user.data())
            .then((data) => this.setState({user: data}))
            .catch((error) => {
                console.log(error);
            })

        app.firestore().collection("/users").doc(this.state.user.uid).get()
            .then((user) => user.data())
            .then((data) => this.setState({reviews: data.reviews, render: true}))
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <Card>
                <Card.Header className="text-center" style={{ backgroundColor: "#13294B", color: "#ffffff", fontSize: "28px" }}>Your Reviews</Card.Header>
                <ListGroup variant="flush">
                    {console.log(this.state)}
                    {(!this.state.render)
                        ? <Spinner animation="border" role="status" />
                        : this.state.reviews.map((review) => {
                            return (<ListGroup.Item style={{ backgroundColor: "#97c0e6" }}>
                                <ReviewCard review={review}></ReviewCard>
                            </ListGroup.Item>)
                        })}
                </ListGroup>
            </Card>
        )
    }
}

export default MyReviews;
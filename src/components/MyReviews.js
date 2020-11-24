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
        let userDB = app.firestore().collection("/users").doc(app.auth().currentUser.uid)
        
        userDB.get()
            .then((user) => user.data())
            .then((data) => this.setState({user: data}))
            .catch((error) => {
                console.log(error);
            })

        userDB = app.firestore().collection("/reviews").where("userID", "==", app.auth().currentUser.uid).get()
            .then((reviews) => {
                let temp = []
                reviews.forEach((review) => temp.push(review.data()))
                this.setState({reviews: temp, render: true})
            }).catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <Card style={{marginTop: "8px"}}>
                <Card.Header className="text-center" style={{backgroundColor: "#13294B", color: "#ffffff", fontSize: "28px"}}>Your Reviews</Card.Header>
                <ListGroup variant="flush">
                    {/* {console.log(this.state)} */}
                    {(!this.state.render)
                        ? <Spinner animation="border" role="status" />
                        : (typeof this.state.reviews != "undefined")
                            ? this.state.reviews.map((r) => {
                                {/* alert(r) */}
                                {/* console.log(r) */}
                                return (<ListGroup.Item style={{ backgroundColor: "#97c0e6" }}>
                                    <ReviewCard review={r}></ReviewCard>
                                </ListGroup.Item>)
                              }) 
                            : (<ListGroup.Item style={{ backgroundColor: "#97c0e6" }}>You have no reviews.</ListGroup.Item>)
                    }
                </ListGroup>
            </Card>
        )
    }
}

export default MyReviews;
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Spinner, ListGroup } from 'react-bootstrap';
import { app } from '../base';
import ReviewCard from './ReviewCard'

class ProfSearched extends Component {
    constructor() {
        super()

        this.state = {
            professor: this.props.prof,
            reviews: [],
            render: false
        }
    }
    
    componentWillMount() {
        app.firestore().collection("/reviews").where('profID', '==', this.props.prof.profID).get()
            .then((reviews) => {
                let temp = []
                reviews.forEach((review) => {
                    let newReview = review.data()
                    temp.push(newReview)
                })
                this.setState({ reviews: temp, render: true })
            }).catch((error) => {
                console.log(error)
            })
    }

    render() {
        return(
            <Card>
                <Card.Header className="text-center" style={{backgroundColor: "#13294B", color: "#ffffff", fontSize: "28px"}}>{this.props.prof.first} {this.props.prof.last}'s Reviews</Card.Header>
                <ListGroup variant="flush">
                    {(!this.state.render)}
                </ListGroup>
             </Card>
            
        )
    }
}
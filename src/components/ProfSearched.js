import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Spinner, ListGroup, Button } from 'react-bootstrap';
import { app } from '../base';
import ReviewCard from './ReviewCard'
import ExistingSubmitForm from './ExistingSubmitForm'

class ProfSearched extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: props.match.params.id,
            prof: '',
            reviews: [],
            render: false
        }
        this.onClick = this.onClick.bind(this)
    }

    onClick() {
        this.setState({isClicked: true})
    }

    componentDidMount() {
        app.firestore().collection("/professors").doc(this.state.id).get()
            .then((prof) => prof.data())
            .then((data) => this.setState({prof: data}))

        
        app.firestore().collection("/reviews").where("profID", "==", this.state.id).get()
            .then((reviews) => {
                let temp = []
                reviews.forEach((review) => {
                    let newReview = review.data()
                    temp.push(newReview)
                })
                return temp
            }).then((array) => this.setState({reviews: array, render: true}))
    }

    render() {
        return (
            (!this.state.render)
            ?<Spinner animation="border" role="status" />
            :(this.state.isClicked)
                ?<ExistingSubmitForm prof={this.state.prof}/>
                :<Card>
                    <Card.Header className="text-center" style={{backgroundColor: "#13294B", color: "#ffffff", fontSize: "28px"}}>
                        <span style={{marginLeft: "200px"}}>{this.state.prof.first} {this.state.prof.last}'s Reviews</span>
                        <Button style={{float:"right", width:"200px"}}onClick={this.onClick}>Rate this Professor</Button>
                    </Card.Header>
                    <ListGroup variant="flush">
                        {this.state.reviews.map((review) => {
                            return (<ListGroup.Item key={review.reviewID} style={{backgroundColor: "#97c0e6"}}>
                                        <ReviewCard review={review}></ReviewCard>
                                    </ListGroup.Item>)
                        })}
                    </ListGroup> 
                </Card>
        )
    }
}

export default ProfSearched;
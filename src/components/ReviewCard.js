import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Figure, Spinner } from 'react-bootstrap';
import { app } from '../base';
import blue from "./blue.png"
import white from "./white.png"

class ReviewCard extends Component {
    constructor() {
        super()
        
        this.state = {
            prof: null,
            render: false
        }
    }
    
    componentWillMount() {
        app.firestore().collection("/professors").doc(this.props.review.profID).get()
            .then((prof) => {
                this.setState({prof: prof.data(), render: true})
            }).catch((error) => {
                console.log(error);
            })
    }

    render() {
        console.log(this.state)
        return (
        !this.state.render
        ?<Spinner animation="border" role="status" />
        :<Card style={{backgroundColor: "#13294B"}}>
            <Card.Title>Professor {this.state.prof.first} {this.state.prof.last}</Card.Title>
            <Card.Body>
                <div className="ratings" style={{columnCount: 1}}>
                    <div>
                        <Figure>
                            <Figure.Caption style={{color: "#ffffff", textAlign: "left", fontSize: "80%"}}>Quality</Figure.Caption>
                            <Figure.Image
                                width={50}
                                height={50}
                                alt=""
                                src={blue}
                                style={{marginTop: "5px"}}
                            />
                            <span className="rating" style={{position: "relative", left: "-50%", fontSize: "22px", fontWeight: "bold"}}>{this.props.review.rating}.0</span>
                        </Figure>
                    </div>
                    
                    <div>
                        <Figure>
                            <Figure.Caption style={{color: "#ffffff", fontSize: "80%"}}>Difficulty</Figure.Caption>
                            <Figure.Image
                                width={50}
                                height={50}
                                alt=""
                                src={white}
                                style={{marginTop: "5px"}}
                            />
                            <span className="rating" style={{position: "relative", left: "-50%", fontSize: "22px", fontWeight: "bold"}}>{this.props.review.difficulty}.0</span>
                        </Figure>
                    </div>
                </div>

                <div className="content">

                </div>
            </Card.Body>
        </Card>)
    }
}

export default ReviewCard
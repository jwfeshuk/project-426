import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Figure, Spinner, Button } from 'react-bootstrap';
import { app } from '../base';
import blue from "./blue.png"
import white from "./white.png"

class ReviewCard extends Component {
    constructor() {
        super()
        
        this.state = {
            prof: null,
            render: false,
            takeAgain: "",
            useTextbook: "",
            attendance: "",
            grade: "",
            tags: "",
            specifics: "",
            tags: []
        }
    }
    
    componentWillMount() {
        if (typeof this.props.review.tags != "undefined") {
            this.setState({
                tags: this.props.review.tags
            })
        }
        
        app.firestore().collection("/professors").doc(this.props.review.profID).get()
            .then((prof) => {
                this.setState({prof: prof.data(), render: true})
            }).catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            !this.state.render
            ?<Spinner animation="border" role="status" />
            :<Card style={{backgroundColor: "#13294B"}}>
                <Card.Title style={{color: "#fff", fontSize: "24px", margin: "20px 20px", display: "flex", justifyContent: "space-between"}}>
                    <div>Professor: {this.state.prof.first} {this.state.prof.last}</div>
                    <div style={{textAling: "left", fontSize: "24px"}}>Course: {this.props.review.courseCode}</div>
                    <div style={{fontSize: "24px"}}>{this.props.review.lastUpdatedPretty}</div>
                </Card.Title>
                <Card.Body>
                    <div className="reviewBody" style={{columnCount: 2}}>
                        <div className="figures" style={{width: "50px"}}>
                            <Figure>
                                <Figure.Caption style={{color: "#ffffff", textAlign: "left", fontSize: "80%", marginLeft: "5px"}}>Quality</Figure.Caption>
                                <Figure.Image
                                    width={50}
                                    height={50}
                                    alt=""
                                    src={blue}
                                    style={{marginTop: "5px"}}
                                />
                                <span className="rating" style={{position: "relative", top: "-51px", left: "8px", fontSize: "22px", fontWeight: "bold"}}>{this.props.review.rating}.0</span>
                                <Figure.Caption style={{color: "#ffffff", fontSize: "80%"}}>Difficulty</Figure.Caption>
                                <Figure.Image
                                    width={50}
                                    height={50}
                                    alt=""
                                    src={white}
                                    style={{marginTop: "5px"}}
                                />
                                <span className="rating" style={{position: "relative", top: "-51px", left: "8px", fontSize: "22px", fontWeight: "bold"}}>{this.props.review.difficulty}.0</span>
                            </Figure>
                        </div>
                        <div className="contentContainer" style={{display: "flex", flexFlow: "column wrap", justifyContent: "space-between", alignContent: "space-around", flexWrap: "", color: "#fff", marginLeft: "-400px", height: "246px"}}>
                            <div className="conds" style={{display: "flex", justifyContent: "space-between"}}>
                                <p>Would Take Again: <strong>{this.props.review.takeAgain}</strong></p>
                                <p>Textbook Required: <strong>{this.props.review.useTextbook}</strong></p>
                                <p>Attendance Required: <strong>{this.props.review.attendance}</strong></p>
                                <p>Grade Received: <strong>{this.props.review.grade}</strong></p>
                            </div>
                            <div className="specifics" style={{display: "flex", justifyContent: "space-between"}}>{this.props.review.specifics}</div>
                            <div className="tags" style={{display: "flex", justifyContent: "space-between"}}>
                                {this.state.tags.map((tag) => <Button variant="secondary" style={{color: "#fff !important"}} disabled>{tag}</Button>)}
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>)
    }
}

export default ReviewCard
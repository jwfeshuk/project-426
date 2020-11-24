import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Figure, Spinner, Button} from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { app } from '../base';
import blue from "./blue.png"
import white from "./white.png"
import EditForm from "./EditForm"

class ReviewCard extends Component {
    constructor() {
        super()
        
        this.state = {
            prof: null,
            render: false,
            tags: [],
            delete: false,
            confirm: false,
            edit: false
        }

        this.delete = this.delete.bind(this)
        this.confirm = this.confirm.bind(this)
        this.edit = this.edit.bind(this)
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

    edit() {
        this.setState({edit: true})
    }

    delete() {
        this.setState({confirm: true, delete: false})
    }
    
    confirm() {
        this.setState({confirm: false})
        
        app.firestore().collections("/reviews").doc(this.props.review.reviewID).delete()
    }
    
    render() {
        let tagFontSize = "15px"
        let width = 930 / this.state.tags.length
        if(this.state.tags.length > 7) {
            tagFontSize = "8px"
        } else if(this.state.tags.length > 6) {
            tagFontSize = "10px"
        } else if(this.state.tags.length > 5) {
            tagFontSize = "12px"
        }
        return (
            (!this.state.render)
            ?<Spinner animation="border" role="status" />
            :(this.state.edit)
                ?<EditForm review={this.props.review} prof={this.state.prof}/>
                :<Card style={{backgroundColor: "#13294B"}}>
                    <Card.Title style={{padding: "15px",border: "1px solid #97c0e6" ,color: "#fff", fontSize: "24px", margin: "20px 20px", display: "flex", justifyContent: "space-between"}}>
                        <div ><strong style={{fontSize: "28px"}}>Professor: </strong>{this.state.prof.first} {this.state.prof.last}</div>
                        <div style={{textAlign: "left", fontSize: "24px"}}><strong style={{fontSize: "28px"}}>Course: </strong>{this.props.review.courseCode}</div>
                        <div style={{fontSize: "28px"}}><em>{this.props.review.lastUpdatedPretty}</em></div>
                    </Card.Title>
                    <Card.Body>
                        <div className="reviewBody" style={{columnCount: 2}}>
                            <div className="figures" style={{width: "20%"}}>
                                <Figure style={{padding: "15px", paddingRight: "25px"}}>
                                    <div style={{borderRight: "1px solid #97c0e6"}}>
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
                                    </div>
                                    <span className="rating" style={{position: "relative", top: "-51px", left: "8px", fontSize: "22px", fontWeight: "bold"}}>{this.props.review.difficulty}.0</span>
                                    {(this.props.review.userID == app.auth().currentUser.uid)
                                        ?<div><Button onClick={this.edit} style={{marginBottom: "5px", marginRight: "5px", backgroundColor: "#97c0e6", borderColor: "#97c0e6", color: "#13294B"}}>Edit</Button>
                                        {(this.state.confirm)
                                            ?<Button onClick={this.confirm} style={{marginRight: "5px", backgroundColor: "#97c0e6", borderColor: "#97c0e6", color: "#13294B"}}>Confirm Delete?</Button>
                                            :<Button onClick={this.delete} style={{marginRight: "5px", backgroundColor: "#97c0e6", borderColor: "#97c0e6", color: "#13294B"}}>Delete</Button>
                                        }</div>
                                    : null}
                                </Figure>
                            </div>
                            <div className="contentContainer" style={{flexwrap: "wrap", display: "flex", flexFlow: "column wrap", justifyContent: "space-between", alignContent: "space-around", flexWrap: "", color: "#fff", marginRight: "10px", marginLeft: "-400px", height: "300px"}}>
                                <div className="conds" style={{flexwrap: "wrap", borderBottom: "1px solid #97c0e6", display: "flex", justifyContent: "space-between", fontSize: "16px"}}>
                                    <div style={{flex: "25%"}}><p style={{padding: "5px", paddingBottom: "0px"}}>Would Take Again: <strong>{("true" == this.props.review.takeAgain)?"Yes":"No"}</strong></p></div>
                                    <div style={{flex: "25%"}}><p style={{padding: "5px", paddingBottom: "0px"}}>Textbook Required: <strong>{("true" == this.props.review.useTextbook)?"Yes":"No"}</strong></p></div>
                                    <div style={{flex: "25%"}}><p style={{padding: "5px", paddingBottom: "0px"}}>Attendance Required: <strong>{("true" == this.props.review.attendance)?"Yes":"No"}</strong></p></div>
                                    <div style={{flex: "25%"}}><p style={{padding: "5px", paddingBottom: "0px"}}>Grade Received: <strong>{(!!this.props.review.grade)?this.props.review.grade:"Prefer Not To Say"}</strong></p></div>
                                </div>
                                <div className="specifics" style={{height: "50%", display: "flex", justifyContent: "space-between", fontSize: "22px"}}>{this.props.review.specifics}</div>
                                <div className="tags" style={{display: "flex", justifyContent: "center"}}>
                                    <ListGroup horizontal>
                                        {this.state.tags.map((tag) => <ListGroup.Item className="text-center" style={{fontSize: tagFontSize, width: width+"px", backgroundColor: "", color: "#13294B"}}><strong>{tag}</strong></ListGroup.Item>)}
                                    </ListGroup>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>)
    }
}

export default ReviewCard
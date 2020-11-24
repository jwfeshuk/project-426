import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Form, Col } from 'react-bootstrap';
import { app } from '../base';
import ReviewCard from './ReviewCard'
class EditForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            profID: "",
            userID: "",
            courseCode: "",
            rating: 0,
            difficulty: 0,
            takeAgain: null,
            useTextbook: null,
            attendance: null,
            grade: "",
            tags: [],
            specifics: "",
            lastUpdated: "",
            lastUpdatedPretty: ""
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.cancel = this.cancel.bind(this)
    }

    componentDidMount() {
        this.setState({
            profID: this.props.review.profID,
            userID: this.props.review.userID,
            lastUpdated: this.props.review.lastUpdated,
            lastUpdatedPretty: this.props.review.lastUpdatedPretty,
            courseCode: this.props.review.courseCode,
            rating: this.props.review.rating,
            difficulty: this.props.review.difficulty,
            takeAgain: this.props.review.takeAgain,
            useTextbook: this.props.review.useTextbook,
            attendance: this.props.review.attendance,
            grade: this.props.review.grade,
            tags: this.props.review.tags,
            specifics: this.props.review.specifics
        })
    }

    onSubmit(e) {
        e.preventDefault();
        
        let reviewCol = app.firestore().collection("/reviews")
        
        if (!!this.state.courseCode && this.state.rating != 0 && this.state.difficulty != 0 && !!this.state.takeAgain
            && !!this.state.useTextbook && !!this.state.specifics) {
            
            let today = new Date()
            this.setState({
                lastUpdated: today.getTime(),
                lastUpdatedPretty: (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear()
            })

            reviewCol.doc(this.props.review.reviewID).update({
                profID: this.state.profID,
                userID: this.state.userID,
                lastUpdated: this.state.lastUpdated,
                lastUpdatedPretty: this.state.lastUpdatedPretty,
                courseCode: this.state.courseCode,
                rating: this.state.rating,
                difficulty: this.state.difficulty,
                takeAgain: this.state.takeAgain,
                useTextbook: this.state.useTextbook,
                specifics: this.state.specifics
            }).then(() => {
                if (typeof this.state.attendance != "undefined") {
                    reviewCol.doc(this.props.review.reviewID).update({attendance: this.state.attendance})
                }
            }).then(() => {
                if (typeof this.state.grade != "undefined") {
                    reviewCol.doc(this.props.review.reviewID).update({grade: this.state.grade})
                }
            }).then(() => {
                if (typeof this.state.tags != "undefined") {
                    reviewCol.doc(this.props.review.reviewID).update({tags: this.state.tags})
                }
            }).then(() => {
                window.location.reload()
            })
        } else {
            alert("Something went wrong! Make sure the form is filled out!")
        }
    }

    cancel() {
        window.location.reload()
    }

    render() {
        return (
            <Card style={{ width: "90%", marginLeft: "5%", backgroundColor: "#13294B", color: "#97c0e6"}}>
                <Card.Title style={{textAlign: "center", marginTop: "15px", fontSize: "24px"}}>Editing your Review of {this.props.prof.first} {this.props.prof.last}</Card.Title>
                <Card.Body>
                    <Form>
                        <Form.Group controlId="formCourseCode">
                            <Form.Label>Course Code</Form.Label>
                            <Form.Control type="name" placeholder="e.g. COMP 426" value={this.state.courseCode} onChange={e => this.setState({ courseCode: e.target.value })} />
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>How would you rate this Professor?</Form.Label>
                                <Form.Group controlId="rating" value={this.state.rating} onChange={e => this.setState({ rating: e.target.value })}>
                                    <Form.Check inline id="rating1" name="rating" type="radio" label="1" value="1" checked={this.state.rating == "1"}/>
                                    <Form.Check inline id="rating2" name="rating" type="radio" label="2" value="2" checked={this.state.rating == "2"}/>
                                    <Form.Check inline id="rating3" name="rating" type="radio" label="3" value="3" checked={this.state.rating == "3"}/>
                                    <Form.Check inline id="rating4" name="rating" type="radio" label="4" value="4" checked={this.state.rating == "4"}/>
                                    <Form.Check inline id="rating5" name="rating" type="radio" label="5" value="5" checked={this.state.rating == "5"}/>
                                </Form.Group>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>How difficult was their class?</Form.Label>
                                <Form.Group controlId="diff" value={this.state.difficulty} onChange={e => this.setState({ difficulty: e.target.value })}>
                                    <Form.Check inline id="diff1" name="diff" type="radio" label="1" value="1" checked={this.state.difficulty == "1"}/>
                                    <Form.Check inline id="diff2" name="diff" type="radio" label="2" value="2" checked={this.state.difficulty == "2"}/>
                                    <Form.Check inline id="diff3" name="diff" type="radio" label="3" value="3" checked={this.state.difficulty == "3"}/>
                                    <Form.Check inline id="diff4" name="diff" type="radio" label="4" value="4" checked={this.state.difficulty == "4"}/>
                                    <Form.Check inline id="diff5" name="diff" type="radio" label="5" value="5" checked={this.state.difficulty == "5"}/>
                                </Form.Group>
                            </Form.Group>
                            <Form.Group as={Col} controlId="finalGrade">
                                <Form.Label>What was your final grade? <em>(Optional)</em></Form.Label>
                                <Form.Control as="select" defaultValue={this.state.grade} onChange={e => this.setState({ grade: e.target.value })}>
                                    <option>A</option>
                                    <option>A-</option>
                                    <option>B+</option>
                                    <option>B</option>
                                    <option>B-</option>
                                    <option>C+</option>
                                    <option>C</option>
                                    <option>C-</option>
                                    <option>D+</option>
                                    <option>D</option>
                                    <option>D-</option>
                                    <option>F</option>
                                    <option>Pass/Fail</option>
                                    <option>Withdrawal</option>
                                    <option>Prefer Not To Say</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Would you take this professor again?</Form.Label>
                                <Form.Group controlId="again" onChange={e => this.setState({ takeAgain: e.target.value })}>
                                    <Form.Check inline id="againYes" name="again" type="radio" label="Yes" value={true} checked={this.state.takeAgain == "true"}/>
                                    <Form.Check inline id="againNo" name="again" type="radio" label="No" value={false} checked={this.state.takeAgain === "false"}/>
                                </Form.Group>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Was attendance required? <em>(Optional)</em></Form.Label>
                                <Form.Group controlId="attendance" onChange={e => this.setState({ attendance: e.target.value })}>
                                    <Form.Check inline id="attendanceYes" name="attendance" type="radio" label="Yes" value={true} checked={this.state.attendance == "true"}/>
                                    <Form.Check inline id="attendanceNo" name="attendance" type="radio" label="No" value={false} checked={this.state.attendance == "false"}/>
                                </Form.Group>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Did the class require a textbook?</Form.Label>
                                <Form.Group controlId="textbook" onChange={e => this.setState({ useTextbook: e.target.value })}>
                                    <Form.Check inline id="textbookYes" name="textbook" type="radio" label="Yes" value={true} checked={this.state.useTextbook == "true"}/>
                                    <Form.Check inline id="textbookNo" name="textbook" type="radio" label="No" value={false} checked={this.state.useTextbook == "false"}/>
                                </Form.Group>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Which of these best describes the professor? <em>(Optional)</em></Form.Label>
                                <Form.Group controlId="tags" onChange={

                                    e => {

                                        //this.setState({ tags: e.target.value })

                                        // current array of options
                                        const tags = this.state.tags
                                        let index

                                        // check if the check box is checked or unchecked
                                        if (e.target.checked) {
                                            // add the numerical value of the checkbox to options array
                                            tags.push(e.target.value)
                                        } else {
                                            // or remove the value from the unchecked checkbox from the array
                                            index = tags.indexOf(e.target.value)
                                            tags.splice(index, 1)
                                        }

                                        // update the state with the new array of options
                                        this.setState({ tags: tags })

                                    }

                                }>
                                    <Form.Check inline id="tag1" name="tags" type="checkbox" label="Respected" value="Respected" checked={this.state.tags.includes("Respected")}/>
                                    <Form.Check inline id="tag2" name="tags" type="checkbox" label="Engaging" value="Engaging" checked={this.state.tags.includes("Engaging")}/>
                                    <Form.Check inline id="tag3" name="tags" type="checkbox" label="Caring" value="Caring" checked={this.state.tags.includes("Caring")}/>
                                    <Form.Check inline id="tag4" name="tags" type="checkbox" label="Heavy Lecturer" value="Heavy Lecturer" checked={this.state.tags.includes("Heavy Lecturer")}/>
                                    <Form.Check inline id="tag5" name="tags" type="checkbox" label="Tough Grader" value="Tough Grader" checked={this.state.tags.includes("Tough Grader")}/>
                                    <Form.Check inline id="tag6" name="tags" type="checkbox" label="Few Grades" value="Few Grades" checked={this.state.tags.includes("Few Grades")} />
                                    <Form.Check inline id="tag7" name="tags" type="checkbox" label="Participation Expected" value="Participation Expected" checked={this.state.tags.includes("Participation Expected")}/>
                                    <Form.Check inline id="tag8" name="tags" type="checkbox" label="Attend or Fail" value="Attend or Fail" checked={this.state.tags.includes("Attend or Fail")}/>
                                    <Form.Check inline id="tag9" name="tags" type="checkbox" label="Approchable" value="Approachable" checked={this.state.tags.includes("Approachable")}/>
                                    <Form.Check inline id="tag10" name="tags" type="checkbox" label="Paper Heavy" value="Paper Heavy" checked={this.state.tags.includes("Paper Heavy")}/>
                                </Form.Group>
                            </Form.Group>
                        </Form.Row>
                        <Form.Label>Here's your chance to be more specific</Form.Label>
                        <Form.Control style={{marginBottom: "8px"}} value={this.state.specifics} as="textarea" onChange={e => this.setState({ specifics: e.target.value })} />
                        <Button style={{marginRight: "5px", backgroundColor: "#97c0e6", borderColor: "#97c0e6", color: "#13294B"}} onClick={this.onSubmit} type="submit">Submit</Button>
                        <Button style={{backgroundColor: "#97c0e6", borderColor: "#97c0e6", color: "#13294B"}} onClick={this.cancel}>Cancel</Button>
                    </Form>
                </Card.Body>
            </Card>
        )
    }
}

export default EditForm;
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Form, Col } from 'react-bootstrap';
import { app } from '../base';

class ExistingSubmitForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profID: "",
            courseCode: "",
            rating: 0,
            difficulty: 0,
            takeAgain: null,
            useTextbook: null,
            attendance: null,
            grade: "",
            tags: [],
            specifics: "",
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    createSelectItems() {
        let items = this.props.profs.map((prof, i) => <option key={i} value={prof.id}>{prof.display}</option>)
        return items
    }

    onSubmit(e) {
        e.preventDefault();
        if (!!this.state.profID && !!this.state.courseCode && this.state.rating != 0 && this.state.difficulty != 0 
            && !!this.state.takeAgain && !!this.state.useTextbook && !!this.state.specifics) {
                let review = {
                    profID: this.state.profID,
                    courseCode: this.state.courseCode,
                    rating: this.state.rating,
                    difficulty: this.state.difficulty,
                    takeAgain: this.state.takeAgain,
                    useTextbook: this.state.useTextbook,
                    specifics: this.state.specifics
                }
                
                if (!!this.state.attendance) {
                    review.attendance = this.state.attendance
                }
    
                if (typeof review.grade != "undefined") {
                    review.grade = this.state.grade
                }
        
                if (typeof review.tags != "undefined") {
                    review.tags = this.state.tags
                }
    
                let reviewCol = app.firestore().collection("/reviews")
        
                let today = new Date()
                review.lastUpdated = today.getTime()
                review.lastUpdatedPretty = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear()
    
                let reviewDB = reviewCol.add(review).then((reviewRef) => {
                    review.reviewID = reviewRef.id
    
                    reviewCol.doc(reviewRef.id).update({
                        reviewID: reviewRef.id
                    })
                    window.location.href = "/"
                }).catch((error) => {
                    console.log(error);
                })
        } else {
            alert("You didn't finish the form! Please go back and finish.")
        }
    }

    render() {
        return (
            <Card style={{ width: "90%", marginLeft: "5%", backgroundColor: "#97c0e6", color: "#13294B"}}>
                <Card.Title className="text-center" style={{fontSize: "50px", fontFamily: "sans-serif", paddingTop: "15px"}}>Existing Professor Review Form</Card.Title>
                <Card.Body>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formProfFirst">
                                <Form.Label>Professor</Form.Label>
                                <Form.Control as="select" defaultValue="Choose a Professor" onChange={e => this.setState({ profID: e.target.value })}>
                                    <option>Choose a Professor</option>
                                    {this.createSelectItems()}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formCourseCode">
                                <Form.Label>Course Code</Form.Label>
                                <Form.Control type="name" placeholder="e.g. COMP 426" onChange={e => this.setState({ courseCode: e.target.value })} />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>How would you rate this Professor?</Form.Label>
                                <Form.Group controlId="rating" onChange={e => this.setState({ rating: e.target.value })}>
                                    <Form.Check inline id="rating1" name="rating" type="radio" label="1" value="1" />
                                    <Form.Check inline id="rating2" name="rating" type="radio" label="2" value="2" />
                                    <Form.Check inline id="rating3" name="rating" type="radio" label="3" value="3" />
                                    <Form.Check inline id="rating4" name="rating" type="radio" label="4" value="4" />
                                    <Form.Check inline id="rating5" name="rating" type="radio" label="5" value="5" />
                                </Form.Group>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>How difficult was their class?</Form.Label>
                                <Form.Group controlId="diff" onChange={e => this.setState({ difficulty: e.target.value })}>
                                    <Form.Check inline id="diff1" name="diff" type="radio" label="1" value="1" />
                                    <Form.Check inline id="diff2" name="diff" type="radio" label="2" value="2" />
                                    <Form.Check inline id="diff3" name="diff" type="radio" label="3" value="3" />
                                    <Form.Check inline id="diff4" name="diff" type="radio" label="4" value="4" />
                                    <Form.Check inline id="diff5" name="diff" type="radio" label="5" value="5" />
                                </Form.Group>
                            </Form.Group>
                            <Form.Group as={Col} controlId="finalGrade">
                                <Form.Label>What was your final grade? <em>(Optional)</em></Form.Label>
                                <Form.Control as="select" defaultValue="Prefer Not To Say" onChange={e => this.setState({ grade: e.target.value })}>
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
                                    <Form.Check inline id="againYes" name="again" type="radio" label="Yes" value={true} />
                                    <Form.Check inline id="againNo" name="again" type="radio" label="No" value={false} />
                                </Form.Group>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Was attendance required? <em>(Optional)</em></Form.Label>
                                <Form.Group controlId="attendance" onChange={e => this.setState({ attendance: e.target.value })}>
                                    <Form.Check inline id="attendanceYes" name="attendance" type="radio" label="Yes" value={true} />
                                    <Form.Check inline id="attendanceNo" name="attendance" type="radio" label="No" value={false} />
                                </Form.Group>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Did the class require a textbook?</Form.Label>
                                <Form.Group controlId="textbook" onChange={e => this.setState({ useTextbook: e.target.value })}>
                                    <Form.Check inline id="textbookYes" name="textbook" type="radio" label="Yes" value={true} />
                                    <Form.Check inline id="textbookNo" name="textbook" type="radio" label="No" value={false} />
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
                                    <Form.Check inline id="tag1" name="tags" type="checkbox" label="Respected" value="Respected" />
                                    <Form.Check inline id="tag2" name="tags" type="checkbox" label="Engaging" value="Engaging" />
                                    <Form.Check inline id="tag3" name="tags" type="checkbox" label="Caring" value="Caring" />
                                    <Form.Check inline id="tag4" name="tags" type="checkbox" label="Heavy Lecturer" value="Heavy Lecturer" />
                                    <Form.Check inline id="tag5" name="tags" type="checkbox" label="Tough Grader" value="Tough Grader" />
                                    <Form.Check inline id="tag6" name="tags" type="checkbox" label="Few Grades" value="Few Grades" />
                                    <Form.Check inline id="tag7" name="tags" type="checkbox" label="Participation Expected" value="Participation Expected" />
                                    <Form.Check inline id="tag8" name="tags" type="checkbox" label="Attend or Fail" value="Attend or Fail" />
                                    <Form.Check inline id="tag9" name="tags" type="checkbox" label="Approchable" value="Approachable" />
                                    <Form.Check inline id="tag10" name="tags" type="checkbox" label="Paper Heavy" value="Paper Heavy" />
                                </Form.Group>
                            </Form.Group>
                        </Form.Row>
                        <Form.Label>Here's your chance to be more specific <em>(Limit 350 Characters)</em></Form.Label>
                        <Form.Control maxLength="350" style={{marginBottom: "8px", height: "150px"}} as="textarea" onChange={e => this.setState({ specifics: e.target.value })} />
                        <Button style={{marginRight: "5px", backgroundColor: "#13294B", borderColor: "#13294B"}} onClick={this.onSubmit} type="submit">Submit</Button>
                        <Button style={{backgroundColor: "#13294B", borderColor: "#13294B"}} href="/">Cancel</Button>
                    </Form>
                </Card.Body>
            </Card>
        )
    }
}

export default ExistingSubmitForm;
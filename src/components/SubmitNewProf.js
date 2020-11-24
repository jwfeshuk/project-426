import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Form, Col } from 'react-bootstrap';
import { app } from '../base';

class SubmitNewProf extends Component {
    constructor() {
        super();
        this.state = {
            first: "",
            last: "",
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        if (!!this.state.first && !!this.state.last) {
            
            let professor = {
                first: this.state.first,
                last: this.state.last
            }

            if (!!this.state.attendance) {
                
            }
        }
    }

    render() {
        return (
            <Card style={{ width: "90%", marginLeft: "5%", backgroundColor: "#97c0e6", color: "#13294B"}}>
                <Card.Body>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formProfFirst">
                                <Form.Label>Professor's First Name</Form.Label>
                                <Form.Control type="name" placeholder="e.g. Ketan" onChange={e => this.setState({ first: e.target.value })} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formProfFirst">
                                <Form.Label>Professor's Last Name</Form.Label>
                                <Form.Control type="name" placeholder="e.g. Meyer-Patel" onChange={e => this.setState({ last: e.target.value })} />
                            </Form.Group>
                        </Form.Row>
                        <Button style={{marginRight: "5px", backgroundColor: "#13294B", borderColor: "#13294B"}} onClick={this.onSubmit} type="submit">Submit</Button>
                        <Button style={{backgroundColor: "#13294B", borderColor: "#13294B"}} href="/">Cancel</Button>
                    </Form>
                </Card.Body>
            </Card>
        )
    }
}

export default SubmitNewProf;
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Spinner } from 'react-bootstrap';
import { app } from '../base';
import MyReviews from "./MyReviews"

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: "",
            render: false
        }
    }

    componentDidMount() {
        app.firestore().collection("/users").doc(app.auth().currentUser.uid).get()
            .then((user) => user.data())
            .then((data) => this.setState({user: data, render: true}))
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            (!this.props.authenticated)
            ?<Redirect to='/' />
            :<Card>
                <Card.Title style={{textAlign: "center"}}>My Profile</Card.Title>
                <Card.Body>
                    {/* <strong>Email: </strong>{UserEmail} */}
                    <Button onClick={this.editProf}>Edit Profile Information</Button>
                    <Card>
                        <Card.Body>
                            {(!this.state.render)
                            ?<Spinner animation="border" role="status" />
                            :<MyReviews />
                            }
                            
                        </Card.Body>
                    </Card>
                </Card.Body>
            </Card>
        )
    }
}

export default Profile;
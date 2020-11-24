import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Spinner, Form } from 'react-bootstrap';
import { app } from '../base';
import MyReviews from "./MyReviews"

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: "",
            render: false,
            isClicked: false,
            newPass: "",
            confirmPass: "",
            success: false,
            failure: false
        }

        this.onClick = this.onClick.bind(this);
        this.newPassword = this.newPassword.bind(this);
    }

    componentDidMount() {
        app.firestore().collection("/users").doc(app.auth().currentUser.uid).get()
            .then((user) => user.data())
            .then((data) => this.setState({user: data, render: true}))
            .catch((error) => {
                console.log(error);
            })
    }

    onClick() {
        this.setState({isClicked: true})
    }

    newPassword() {
        this.setState({isClicked: false})
        
        if (this.state.newPass == this.state.confirmPass && this.state.newPass.length > 5) {
            app.auth().currentUser.updatePassword(this.state.newPass)
            
            app.firestore().collection("/users").doc(this.state.user.uid).update({
                password: this.state.newPass
            }).then((thisIsUseless) => this.setState({success: true, failure: false}))
        } else {
            if (this.state.newPass.length <= 5) {
                alert("Your password must be at least six characters! Please try again.")
            }
            this.setState({failure: true, success: false})
        }
    }

    render() {
        return (
            (!this.props.authenticated)
            ?<Redirect to='/' />
            :<div><Card>
                <Card.Title style={{textAlign: "center", fontSize: "36px", marginTop: "15px"}}>Your Profile<br/><span style={{fontSize: "20px"}}>({app.auth().currentUser.email})</span></Card.Title>
                <Card.Body style={{textAlign: "center"}}>
                    {(this.state.isClicked)
                        ?<Form style={{width: "50%", marginLeft: "25%"}}>
                            <Form.Group>
                                <Form.Label>New Password (must be at least 6 characters)</Form.Label>
                                <Form.Control type="password" onChange={e => this.setState({ newPass: e.target.value })}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" onChange={e => this.setState({ confirmPass: e.target.value })}></Form.Control>
                            </Form.Group>
                            <Button onClick={this.newPassword}>Confirm</Button>
                        </Form>
                        : (this.state.success)
                            ? <div><Button onClick={this.onClick} variant="secondary" style={{backgroundColor: "#13294B"}}>Edit your Profile</Button><div style={{color: "#00FF00"}}>Sucessfully Changed!</div> </div>
                            : (this.state.failure)
                                ? <div><Button onClick={this.onClick} variant="secondary" style={{backgroundColor: "#13294B"}}>Edit your Profile</Button><div style={{color: "#FF0000"}}>An Error has occurred, please try again.</div> </div>
                                :<Button onClick={this.onClick} variant="secondary" style={{backgroundColor: "#13294B"}}>Edit your Profile</Button>
                    }
                </Card.Body>
            </Card>
            <div>
                {(!this.state.render)
                    ?<Spinner animation="border" role="status" />
                    :<MyReviews />}
            </div>
            </div>
        )
    }
}

export default Profile;
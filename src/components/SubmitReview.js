import { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import { app } from '../base';

class SubmitReview extends Component {
    constructor() {
        super();
        this.state = {
            isClicked: false
        }
        this.writeReview = this.writeReview.bind(this);
    }

    writeReview() {
        this.setState({isClicked: true})
    }

    render() {
        let buttonStyle = {
            width: "225px",
            marginRight: "5px",
            backgroundColor: "#13294B"
        }

        return (
            <Card className="text-center" style={{backgroundColor: "#97c0e6", marginBottom: "8px"}}>
                <Card.Body>
                    <Card.Title style={{fontSize: '40px', color: "#ffffff"}}>Find the Best (Or Worst) CS Professors On Campus</Card.Title>
                    <Card.Subtitle style={{fontSize: '25px', color: "#ffffff"}}>Or Give Your Own Opinion</Card.Subtitle>
                    <Card.Text></Card.Text>
                       {this.props.authenticated
                            ?<Button variant="secondary" style={{backgroundColor: "#13294B"}} href="/ExistingSubmitForm">Write A Review!</Button>
                            :<Button variant="secondary" style={{backgroundColor: "#13294B"}} href="/Login">Login or Signup to See/Post Reviews</Button>
                        }
                </Card.Body>
            </Card>
        )
    }
}

export default SubmitReview;
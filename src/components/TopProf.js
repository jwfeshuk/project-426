import React, { Component } from 'react';
import { Card, ListGroup, Row, Container } from 'react-bootstrap';

let profHighest = ["Jack","Krupa","Sucks"];
let rating = [5,5,5];
let diff = [5,5,5];


class TopProf extends Component {
    render() {
        return(
            <div>
                {this.props.rating 
                ? <Card.Body><span style={{fontSize: "25px"}}>{profHighest[this.props.num]}</span> has a rating of <em style={{fontSize: "25px"}}>{rating[this.props.num]} / 5</em> by {rating[this.props.num]} Reviews</Card.Body>
                : <Card.Body><span style={{fontSize: "25px"}}>{profHighest[this.props.num]}</span> has a rating of <em style={{fontSize: "25px"}}>{rating[this.props.num]} / 5</em> by {rating[this.props.num]} Reviews</Card.Body>
                }
            </div> 
        )
    }
}

export default TopProf;
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import { app } from '../base';

class Profile extends Component {
    constructor(props) {
        super(props)

    }

    render() {

        if (this.props.authenticated !== true) {
            return <Redirect to='/' />
        }

        return (

            // this.props.authenticated



            <>
                Here
            </>
        )
    }
}

export default Profile;
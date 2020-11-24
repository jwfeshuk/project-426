import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import { Form, FormControl, ListGroup, Button } from 'react-bootstrap';
// import SearchProfs from './SearchProfs.js';
import { app } from '../base';
import AutoCompleteProf from "./AutoCompleteProf";

import { debounce } from 'throttle-debounce';

import './Header.css';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            professors: []
        }

        this.autocompleteSearchDebounced = debounce(500, this.autocompleteSearch);

        this.handleSubmit = this.handleSubmit.bind(this)
        // this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        // alert('SEARCH');
        return <Redirect to='/professors/' />
    }

    // handleKeyDown(event) {
    //     alert('Search');
    //     event.preventDefault();
    // }

    componentDidMount() {
        let logDB = async function (db) {
            app.firestore().collection("/professors").get()
                .then((profs) => {
                    let temp = [];
                    profs.forEach((prof) => {
                        let professor = prof.data()
                        temp.push({
                            name: professor.first + professor.last,
                            alpha2Code: professor.profID,
                        })
                    })
                    db.setState({ professors: temp })
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        logDB(this);
    }

    render() {
        const searches = this.state.searches || []
        return (
            <Navbar style={{ backgroundColor: "#13294B", zIndex: "999" }}>
                <Navbar.Brand href="/" style={{ color: "#ffffff" }}>RateUNC</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav style={{ width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                        {this.props.authenticated
                            ?
                            <>
                                {/* <AutoCompleteProf style={{ width: "90%" }} onKeyDown={this.handleKeyDown} /> */}
                                {/* <AutoCompleteProf style={{ width: "90%" }} onSubmit={this.handleSubmit} /> */}
                                <Form inline style={{ width: "90%" }} onSubmit={this.handleSubmit}>
                                    <AutoCompleteProf style={{ width: "90%" }} />
                                </Form>
                            </>

                            :
                            <Form inline style={{ width: "90%" }}>
                                <FormControl style={{ width: "100%" }} variant="outline-light" type="text" placeholder="Login to Search Professors..." className="mr-sm-2" readOnly />
                                {/* <Button variant="outline-light">Search</Button> */}
                            </Form>
                        }
                    </Nav>
                    <Nav className="ml-auto">
                        <Nav.Link href="/about" style={{ color: "#ffffff" }}>About</Nav.Link>
                        {this.props.authenticated
                            ?
                            <>
                                <Nav.Link href="/profile" style={{ color: "#ffffff" }}>Profile</Nav.Link>
                                <Nav.Link href="/logout" style={{ color: "#ffffff" }}>Logout</Nav.Link>
                            </>
                            :
                            <>
                                <Nav.Link className="text-nowrap" href="/login" style={{ color: "#ffffff" }}>Login</Nav.Link>
                                <Nav.Link className="text-nowrap" href="/register" style={{ color: "#ffffff" }}>Register</Nav.Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;
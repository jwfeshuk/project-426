import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import { Form, FormControl } from 'react-bootstrap';

import './Header.css';

class Header extends Component {
    render() {
        return (

            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">RateUNC</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav style={{ width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                        {this.props.authenticated
                            ?
                            <Form inline style={{ width: "90%" }}>
                                <FormControl style={{ width: "100%" }} variant="outline-light" type="text" placeholder="Search Professors..." className="mr-sm-2" />
                                {/* <Button variant="outline-light">Search</Button> */}
                            </Form>
                            :
                            <Form inline style={{ width: "90%" }}>
                                <FormControl style={{ width: "100%" }} variant="outline-light" type="text" placeholder="Login to Search Professors..." className="mr-sm-2" readOnly />
                                {/* <Button variant="outline-light">Search</Button> */}
                            </Form>
                        }
                    </Nav>
                    <Nav className="ml-auto">
                        <Nav.Link href="#about">About</Nav.Link>
                        {this.props.authenticated
                            ?
                            <Nav.Link href="/logout">Logout</Nav.Link>
                            :
                            <>
                            <Nav.Link className="text-nowrap" href="/login">Login</Nav.Link>
                            <Nav.Link className="text-nowrap" href="/register">Register</Nav.Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            // <nav className="pt-navbar">
            //     <div className="pt-navbar-group pt-align-left">
            //         <div className="pt-navbar-heading">RateUNC</div>
            //         {this.props.authenticated
            //             ? <input className="pt-input" placeholder="Search Songs..." type="text" />
            //             : null
            //         }
            //     </div>
            //     {
            //         this.props.authenticated
            //             ? (
            //                 <div className="pt-navbar-group pt-align-right">
            //                     <Link className="pt-button pt-minimal pt-icon-music" to="/songs">Songs</Link>
            //                     <span className="pt-navbar-divider"></span>
            //                     <button className="pt-button pt-minimal pt-icon-user"></button>
            //                     <button className="pt-button pt-minimal pt-icon-cog"></button>
            //                     <Link className="pt-button pt-minimal pt-icon-log-out" to="/logout" aria-label="Log Out"></Link>
            //                 </div>
            //             )
            //             : (
            //                 <div className="pt-navbar-group pt-align-right">
            //                     <Link className="pt-button pt-intent-primary" to="/login">Register/Log In</Link>
            //                 </div>
            //             )
            //     }
            // </nav>
        );
    }
}

export default Header;
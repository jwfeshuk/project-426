import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import { Form, FormControl, ListGroup, Button} from 'react-bootstrap';
import {debounce} from 'throttle-debounce';

import './Header.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            _searches: [],
            searchResults: []
        }

        this.autocompleteDebounced = debounce(250, this.autocompleteSearch)
    }

    changeQuery = event => {
        this.setState({query: event.target.value}, () => {
            this.autocompleteDebounced(this.state.query)
        })
    }

    autocompleteSearch = q => {
        this._fetch(q);
    }

    _fetch = q => {
        if (this.props.options === undefined) {
        } else{
            this.setState({searchResults: []})
            for (let i = 0; i < this.props.options.length; i++) {
                if (this.props.options[i].display.toLowerCase().includes(q) && q != "") {
                    this.state.searchResults.push(this.props.options[i])
                }
            }
            this.setState({ _searches: this.state.searchResults });
        }
    };

    mapSearches(_searches) {
        let searchresult = _searches.map((s, i) => {
            return <Button key={i} href="/search">{s.display}</Button>
        })
        return searchresult;
    }

    render() {
        const _searches = this.state._searches
        return (
            <Navbar style={{backgroundColor: "#13294B"}}>
                <Navbar.Brand href="/" style={{color: "#ffffff"}}>RateUNC</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav style={{ width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                        {this.props.authenticated
                            ?
                            <Form inline style={{ width: "90%" }}>
                                <FormControl style={{ width: "100%" }} variant="outline-light" type="text" placeholder="Search Professors..." className="mr-sm-2" value={this.state.query} onChange={this.changeQuery} />
                                <ListGroup>
                                    {this.mapSearches(_searches)}
                                </ListGroup>
                            </Form>
                            :
                            <Form inline style={{ width: "90%" }}>
                                <FormControl style={{ width: "100%" }} variant="outline-light" type="text" placeholder="Login to Search Professors..." className="mr-sm-2" readOnly />
                                {/* <Button variant="outline-light">Search</Button> */}
                            </Form>
                        }
                    </Nav>
                    <Nav className="ml-auto">
                        <Nav.Link href="/about" style={{color: "#ffffff"}}>About</Nav.Link>
                        {this.props.authenticated
                            ?
                            <Nav.Link href="/logout" style={{color: "#ffffff"}}>Logout</Nav.Link>
                            :
                            <>
                            <Nav.Link className="text-nowrap" href="/login" style={{color: "#ffffff"}}>Login</Nav.Link>
                            <Nav.Link className="text-nowrap" href="/register" style={{color: "#ffffff"}}>Register</Nav.Link>
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
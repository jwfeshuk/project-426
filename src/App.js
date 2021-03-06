import React, { UseEffect, UseState, Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// import { Spinner } from '@blueprintjs/core';
import Header from './components/Header';
// import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import Profile from './components/Profile';
import SubmitReview from './components/SubmitReview';
import RecentReviews from './components/RecentReviews';
import About from './components/About'
import ExistingSubmitForm from './components/ExistingSubmitForm'
import ProfSearched from './components/ProfSearched'
import APISection from './components/APISection'
// import ChordEditor from './components/ChordEditor';
// import SongList from './components/SongList';
import { app, base } from './base';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row, Spinner } from 'react-bootstrap';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
    };
  }

  componentWillMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false
        })
      } else {
        this.setState({
          authenticated: false,
          loading: false
        })
      }
    })

  }

  componentDidMount() {
    app.firestore().collection("/professors").get()
      .then((profs) => {
        let temp = [];
        profs.forEach((prof) => {
          let professor = prof.data()
          temp.push({
            id: professor.profID,
            first: professor.first,
            last: professor.last,
            display: professor.first + " " + professor.last
          })
        })
        this.setState({ options: temp })
      })
      .catch((error) => {
        console.log(error);
      })

    app.firestore().collection("/reviews").orderBy('lastUpdated', 'desc').limit(3).get()
      .then((reviews) => {
        let temp = []
        reviews.forEach((review) => {
          let recent = review.data()
          temp.push(recent)
        })
        this.setState({ recents: temp })
      }).catch((error) => {
        console.log(error)
      })
  }

  componentWillUnmount() {
    this.removeAuthListener();
  }

  render() {
    if (this.state.loading === true) {
      return (
        <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%" }}>
          <h3>Loading</h3>
          <Spinner animation="border" role="status" />
        </div>
      )
    }

    return (
      <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
        <BrowserRouter>
          <div>
          <Header authenticated={this.state.authenticated} />
            <div id="main-content" style={{ padding: "1em" }}>
              <div className="workspace">


                {/* <Route exact path='' component={Header} /> */}

                {/* <Route exact path="/" render={() => (
                  <Header authenticated={this.state.authenticated} />
                 )}/> */}


                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/logout" component={Logout} />
                <Route exact path="/profile" render={() => (
                  <Profile authenticated={this.state.authenticated} />
                )} />
                <Route exact path="/" render={() => (
                  <SubmitReview authenticated={this.state.authenticated} />
                )}/>
                <Route exact path="/" component={APISection}/>
                <Route exact path="/ExistingSubmitForm" render={() => (
                  <ExistingSubmitForm />
                )} />
                <Route exact path="/About" component={About} />
                <Route exact path="/" render={() => (
                  <RecentReviews authenticated={this.state.authenticated} recents={this.state.recents} />
                )} />
                <Route path="/professor/:id" component={ProfSearched} />
                {/*<Container>
                  <Row>
                    <Col><Route exact path="/" component={RecentReviews} /></Col>
                    <Col>
                      <Container>
                        <Row><Route exact path="/" render={() => (
                          <Top3Prof rating="true" />
                        )} /></Row>
                        <Row><Route exact path="/" component={Top3Prof} /></Row>
                      </Container>
                    </Col>
                  </Row>
                </Container>
                        */}
                {/* <Route exact path="/songs" render={(props) => {
                  return (
                    // <SongList songs={this.state.songs} />
                  )
                }} />
                <Route path="/songs/:songId" render={(props) => {
                  const song = this.state.songs[props.match.params.songId];
                  return (
                    song
                    // ? <ChordEditor song={song} updateSong={this.updateSong} />
                    : <h1>Song not found</h1>
                  )
                }} /> */}
              </div>
            </div>
          </div>
        </BrowserRouter>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default App;
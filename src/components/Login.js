import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// import { Toaster, Intent } from '@blueprintjs/core';
import { app } from '../base';

const loginStyles = {
  width: "90%",
  maxWidth: "315px",
  margin: "20px auto",
  border: "1px solid #ddd",
  borderRadius: "5px",
  padding: "10px"
}

class Login extends Component {
  constructor(props) {
    super(props)
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this)
    this.state = {
      redirect: false
    }
  }

  authWithEmailPassword(event) {
    event.preventDefault()

    const email = this.emailInput.value
    const password = this.passwordInput.value

    app.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
            //signed in
            return user;
        })
        .then((user) => {
            if (user && user.user.email) {
                this.loginForm.reset()
                this.setState({redirect: true})
            }
        })
        .catch((error) => {
            console.log(error.code);
            console.log(error.message);
        })

    // app.auth().fetchProvidersForEmail(email)
    //   .then((providers) => {
    //     if (providers.length === 0) {
    //       // create user
    //       return app.auth().createUserWithEmailAndPassword(email, password)
    //     // } else if (providers.indexOf("password") === -1) {
    //     //   // they used facebook
    //     //   this.loginForm.reset()
    //     //   this.toaster.show({ intent: Intent.WARNING, message: "Try alternative login." })
    //     } else {
    //       // sign user in
    //       return app.auth().signInWithEmailAndPassword(email, password)
    //     }
    //   })
    //   .then((user) => {
    //     if (user && user.email) {
    //       this.loginForm.reset()
    //       this.setState({redirect: true})
    //     }
    //   })
    //   .catch((error) => {
    //     // this.toaster.show({ intent: Intent.DANGER, message: error.message })
    //   })
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to='/' />
    }

    return (
      <div style={loginStyles}>
        {/* <Toaster ref={(element) => { this.toaster = element }} /> */}
        {/* <button style={{width: "100%"}} className="pt-button pt-intent-primary" onClick={() => { this.authWithFacebook() }}>Log In with Facebook</button> */}
        {/* <hr style={{marginTop: "10px", marginBottom: "10px"}}/> */}
        <form onSubmit={(event) => { this.authWithEmailPassword(event) }} ref={(form) => { this.loginForm = form }}>
          <div style={{marginBottom: "10px"}} className="pt-callout pt-icon-info-sign">
            <h5>Login</h5>
            Enter your email and password to log in.
          </div>
          <label className="pt-label">
            Email
            <input style={{width: "100%"}} className="pt-input" name="email" type="email" ref={(input) => { this.emailInput = input }} placeholder="Email"></input>
          </label>
          <label className="pt-label">
            Password
            <input style={{width: "100%"}} className="pt-input" name="password" type="password" ref={(input) => { this.passwordInput = input }} placeholder="Password"></input>
          </label>
          <input style={{width: "100%"}} type="submit" className="pt-button pt-intent-primary" value="Log In"></input>

        </form>
      </div>
    )
  }
}

export default Login;
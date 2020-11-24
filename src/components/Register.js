import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// import { Toaster, Intent } from '@blueprintjs/core';
import { app } from '../base';

const registerStyles = {
  width: "90%",
  maxWidth: "315px",
  margin: "20px auto",
  border: "1px solid #ddd",
  borderRadius: "5px",
  padding: "10px"
}

class Register extends Component {
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

    app.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            //registered
            return user;
        })
        .then((user) => {
            if (user && user.user.email) {
                app.firestore().collection("/users").doc(user.user.uid).set({
                    email: user.user.email,
                    password: password,
                    uid: user.user.uid
                })
                this.registerForm.reset()
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
      <div style={registerStyles}>
        {/* <Toaster ref={(element) => { this.toaster = element }} /> */}
        {/* <button style={{width: "100%"}} className="pt-button pt-intent-primary" onClick={() => { this.authWithFacebook() }}>Log In with Facebook</button> */}
        {/* <hr style={{marginTop: "10px", marginBottom: "10px"}}/> */}
        <form onSubmit={(event) => { this.authWithEmailPassword(event) }} ref={(form) => { this.registerForm = form }}>
          <div style={{marginBottom: "10px"}} className="pt-callout pt-icon-info-sign">
            <h5>Register</h5>
            Create a new account by entering your email and password.
          </div>
          <label className="pt-label">
            Email
            <input style={{width: "100%"}} className="pt-input" name="email" type="email" ref={(input) => { this.emailInput = input }} placeholder="Email"></input>
          </label>
          <label className="pt-label">
            Password
            <input style={{width: "100%"}} className="pt-input" name="password" type="password" ref={(input) => { this.passwordInput = input }} placeholder="Password"></input>
          </label>
          <input style={{width: "100%"}} type="submit" className="pt-button pt-intent-primary" value="Register"></input>

        </form>
      </div>
    )
  }
}

export default Register;
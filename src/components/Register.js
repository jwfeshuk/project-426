import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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

    if (email == "" && password == "") {
      alert('Please enter your email and password.')
    } else if (email == "") {
      alert('Please enter your email.')
    } else if (!/unc.edu/.test(email)) {
      alert('Please use a valid UNC email using ".unc.edu"');
    } else if (password == "") {
      alert('Please enter your password.')
    }

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
          this.setState({ redirect: true })
        }
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      })
  }

  // authWithEmailPassword(event) {
  //   event.preventDefault()

  //   const email = this.emailInput.value
  //   const password = this.passwordInput.value

  //   if (email == "" && password == "") {
  //     alert('Please enter your email and password.')
  //   } else if (email == "") {
  //     alert('Please enter your email.')
  //   } else if (!/unc.edu/.test(email)) {
  //     alert('Please use a valid UNC email using ".unc.edu"');
  //   } else if (password == "") {
  //     alert('Please enter your password.')
  //   }

  //   app.auth().createUserWithEmailAndPassword(email, password)
  //     .then((user) => {
  //       return user;
  //     }).then((user) => {

  //       if (user && user.user.email) {
  //         app.firestore().collection("/users").doc(user.user.uid).set({
  //           email: user.user.email,
  //           password: password,
  //           uid: user.user.uid
  //         })
  //         this.registerForm.reset()
  //         this.setState({ redirect: true })
  //         // console.log('here2');window.location.href = "/"
  //       }

  //     })
  //     .catch((error) => {
  //       this.registerForm.reset();
  //       alert(error.code + "\n" + error.message);
  //     })

  // }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to='/' />
    }
    return (
      <div style={registerStyles}>
        <form onSubmit={(event) => { this.authWithEmailPassword(event) }} ref={(form) => { this.registerForm = form }}>
          <div style={{ marginBottom: "10px" }} className="pt-callout pt-icon-info-sign">
            <h5>Register</h5>
            Create a new account by entering your email and password.
          </div>
          <label className="pt-label">
            Email
            <input style={{ width: "100%" }} className="pt-input" name="email" type="email" ref={(input) => { this.emailInput = input }} placeholder="Email"></input>
          </label>
          <label className="pt-label">
            Password
            <input style={{ width: "100%" }} className="pt-input" name="password" type="password" ref={(input) => { this.passwordInput = input }} placeholder="Password"></input>
          </label>
          <input style={{ width: "100%" }} type="submit" className="pt-button pt-intent-primary" value="Register"></input>
        </form>
      </div>
    )
  }
}

export default Register;
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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

        if (email == "" && password == "") {
            alert('Please enter your email and password.')
            return;
        }
        if (email == "") {
            alert('Please enter your email.')
            return;
        }
        if (!/unc.edu/.test(email)) {
            alert('Please use a valid UNC email using ".unc.edu"');
            return;
        }
        if (password == "") {
            alert('Please enter your password.')
            return;
        }

        app.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                //signed in
                return user;
            })
            .then((user) => {
                if (user && user.user.email) {
                    this.loginForm.reset();
                    window.location.href = "/";
                }
            })
            .catch((error) => {
                this.loginForm.reset();
                alert(error.code + "\n" + error.message);
            })
    }

    render() {
        return (
            <div style={loginStyles}>
                <form onSubmit={(event) => { this.authWithEmailPassword(event) }} ref={(form) => { this.loginForm = form }}>
                    <div style={{ marginBottom: "10px" }} className="pt-callout pt-icon-info-sign">
                        <h5>Login</h5>
                            Enter your email and password to log in.
                     </div>
                    <label className="pt-label">
                        Email
                        <input style={{ width: "100%" }} className="pt-input" name="email" type="email" ref={(input) => { this.emailInput = input }} placeholder="Email"></input>
                    </label>
                    <label className="pt-label">
                        Password
                        <input style={{ width: "100%" }} className="pt-input" name="password" type="password" ref={(input) => { this.passwordInput = input }} placeholder="Password"></input>
                    </label>
                    <input style={{ width: "100%" }} type="submit" className="pt-button pt-intent-primary" value="Log In"></input>
                </form>
            </div>
        )
    }
}

export default Login;
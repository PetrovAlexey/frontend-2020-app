import React, { Component } from 'react';
import {signIn, signUp} from "../../actions/api";

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();

        signUp(this.state.username, this.state.password)
            .then( r => r.json())
            .then( r => {
                if (r.success) {
                    console.log(r.data.token)
                    localStorage.setItem('token', r.data.token);
                } else if (r.status === 400) {
                    console.log("Some parameters aren't valid");
                } else if (r.status === 409) {
                    console.log("This Login already exists");
                } else {
                    console.log(r.statusText);
                }
            }).catch(e => console.log("Error: ", e)
        );
    }

    render() {
        return (
            <section>
                <section>
                    <h1>{localStorage.getItem('token')}</h1>
                    <form onSubmit={this.handleSubmit}>
                        <article>Sign Up</article>
                        <p>Login: </p>
                        <input type="text" name="username" onChange={this.handleChange} placeholder="Login" required autoFocus />
                        <p>Password: </p>
                        <input type="text" name="password" onChange={this.handleChange} placeholder="Password" required />
                        <br />
                        <button type="submit">Sign Up</button>
                    </form>
                </section>
            </section>
        )
    }

}

export default SignUp;
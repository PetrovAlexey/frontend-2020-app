import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Auth.css';
import {getSelfUser, signIn, signUp} from "../../actions/api";
import SignOut from "../SignOut/SignOut";

class Auth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false,
            register: false,
            loggin: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitRegister = this.handleSubmitRegister.bind(this);
        this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    }

    componentDidMount() {
        getSelfUser()
            .then(response =>
                response.json())
            .then(response => {
                if (response.success) {
                    console.log(response)
                    this.setState({loggin : response.data.user.username});
                } else if (response.status === 401) {
                    console.log('Need authenticate');
                }
            })
            .catch(e => console.log(e));
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value});
    }

    handleSubmitLogin(e) {
        e.preventDefault();
        let loggin = this.state.username;
        signIn(this.state.username, this.state.password)
            .then(r => r.json())
            .then(r => {
                if (r.success) {
                    localStorage.setItem('token', r.data.token);
                    this.setState({
                        loggin: loggin,
                        username: '',
                        password: '',
                    });
                    console.log(`login: get token ${r.data.token}`);
                } else if (r.status === 400) {
                    console.log("Some parameters aren't valid");
                } else {
                    console.log(r.statusText);
                }
            });
    }

    handleSubmitRegister(e) {
        e.preventDefault();
        let loggin = this.state.username;
        signUp(this.state.username, this.state.password)
            .then( r => r.json())
            .then( r => {
                if (r.success) {
                    console.log(r.data.token)
                    localStorage.setItem('token', r.data.token);
                    this.setState({
                        loggin: loggin,
                        username: '',
                        password: ''
                    });
                } else if (r.status === 400) {
                    console.log("Some parameters aren't valid");
                } else if (r.status === 409) {
                    console.log("This Login already exists");
                } else {
                    console.log(r.statusText);
                }
            });
    }



    updateData = (value) => {
        this.setState({ loggin: value })
    }

    render() {
        const { loggin } = this.state.loggin;
        const { username, password, submitted, register } = this.state;
        let content = '';
        if (this.state.loggin.toString() !== '') {
            console.log(this.state.loggin);
            content =
                <div>
                <h2>Привет, {this.state.loggin}</h2>
                    <SignOut loggin={this.state.loggin} updateData={this.updateData}/>
                </div>
        }
        else if (!this.state.register) {
            content =
                <div>
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmitLogin}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" autoComplete="off" className="form-control" name="username" value={username} onChange={this.handleChange} placeholder="Login" required autoFocus />
                        {submitted && !username &&
                        <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" autoComplete="off" className="form-control" name="password" value={password} onChange={this.handleChange} placeholder="Password" required autoFocus />
                        {submitted && !password &&
                        <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </div>
                </form>
                    <h4>Not register yet? Register Now!</h4>
                    <button className="btn btn-primary"  onClick={() => this.setState({register: true})}>Register</button>
                </div>
        } else {
                content =
                    <div>
                    <h2>Register</h2>
                    <form name="form" onSubmit={this.handleSubmitRegister}>
                        <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                            <label htmlFor="username">Username</label>
                            <input type="text" autoComplete="off" className="form-control" name="username" value={username} onChange={this.handleChange} placeholder="Login" required autoFocus />
                            {submitted && !username &&
                            <div className="help-block">Username is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                            <label htmlFor="password">Password</label>
                            <input type="password" autoComplete="off" className="form-control" name="password" value={password} onChange={this.handleChange} placeholder="Password" required autoFocus />
                            {submitted && !password &&
                            <div className="help-block">Password is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Submit</button>
                        </div>
                    </form>
                        <button className="btn btn-primary"  onClick={() => this.setState({register: false})}>Login</button>
                    </div>
        }

        return (
            <div className="Auth">
                {content}
            </div>
        );
    }
}

export default Auth;

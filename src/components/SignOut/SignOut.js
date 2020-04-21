import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import './SignOut.css';
import {getArticles, getSelfUser} from "../../actions/api";

class SignOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };

  }

  componentDidMount() {
    getSelfUser()
        .then(response =>
            response.json())
        .then(response => {
          if (response.success) {
            console.log(response)
            this.setState({'username' : response.data.user.username});
          } else if (response.status === 401) {
            console.log('Need authenticate');
          }
        })
        .catch(e => console.log(e));
  }

  signOut() {
    localStorage.setItem('token', '');
    localStorage.setItem('userId', '');
  }



  render() {
    return (
        <header>
          <button onClick={this.signOut}>Sign Out</button>
          <article>{this.state.username}</article>
          <br/>
        </header>
    );
  }
}

export default SignOut;

/*function Login() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/Login.js</code> and save to reload.
          <br/>
          Login page ;)
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Login;*/

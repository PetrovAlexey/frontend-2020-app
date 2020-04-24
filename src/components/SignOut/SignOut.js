import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import './SignOut.css';
import {getArticles, getSelfUser} from "../../actions/api";

class SignOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.loggin
    };
    this.signOut = this.signOut.bind(this);
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
        this.setState({ username: '' });
        localStorage.setItem('token', '');
        localStorage.setItem('userId', '');
        this.props.updateData(this.state.username);
  }

  render() {
    return (
        <header>
          <button className="btn btn-primary" onClick={this.signOut}>Sign Out</button>
          <br/>
        </header>
    );
  }
}

export default SignOut;


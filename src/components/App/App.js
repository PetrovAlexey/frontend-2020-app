import React from 'react';
import './App.css';

import Header from '../Header/Header';

import ProjectPage from "../../pages/project";
import HomePage from "../../pages/home";

import { Route, Switch, Redirect } from 'react-router-dom';

class App extends React.Component {
    render() {
        return (
            <div className='app'>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
                      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
                      crossOrigin="anonymous"/>
                <Header brand="Articles"></Header>

                <main className='main'>
                    <Switch>
                        <Route path='/project/:id' component={ProjectPage} />
                        <Route exact path='/' component={HomePage} />
                        <Redirect to='/' />
                    </Switch>
                </main>
                <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
                        integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
                        crossOrigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
                        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
                        crossOrigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
                        integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
                        crossOrigin="anonymous"></script>
            </div>
        );
    }
}

export default App;
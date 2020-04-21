import React from 'react';
import '../../components/App/App.css';

import works from '../../works';

import Auth from '../../components/Auth/Auth';
import About from '../../components/About/About';
import PortfolioItem from '../../components/PortfolioItem/PortfolioItem';
import ContactForm from "../../components/ContactForm/ContactForm";
import SignUp from "../../components/SignUp/SignUp";
import SignOut from "../../components/SignOut/SignOut"
import {getArticles, postArticle} from "../../actions/api";
import Articles from "../../components/Articles/Articles";

class HomePage extends React.Component {
    state = {
        closed: true
    };

    openForm() {
        this.setState({
            closed: false
        });
    }

    closeForm() {
        this.setState({
            closed: true
        });
    }

    render() {
        return (
            <div className='app'>
                <main className='main'>
                    <Auth>
                    </Auth>

                    <SignOut>
                    </SignOut>

                    <SignUp>
                    </SignUp>


                    <About title='React-разработчик Алексей Петров'>
                        <p>
                            Разрабатываю на самом крутом в мире фреймворке
                            <br />
                            самые крутые в мире SPA!
                        </p>
                        <p>С удовольствием и вам что-нибудь разработаю ;)</p>
                    </About>


                    <Articles/>

                    <div className='contacts'>
                        <div className='container'>
                            {this.state.closed ? (
                                <button
                                className='button'
                                onClick={() => this.openForm()}>
                                    Открыть форму
                                </button>
                            ) : (
                                <div>
                                    <hr/>
                                    <ContactForm onSubmit={() => this.closeForm()}/>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        );
    }

}

export default HomePage;
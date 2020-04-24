import React from 'react';
import '../../components/App/App.css';


import Auth from '../../components/Auth/Auth';
import About from '../../components/About/About';

import Articles from "../../components/Articles/Articles";

class HomePage extends React.Component {


    render() {
        return (
            <div className='app'>
                <main className='main'>
                    <Auth>
                    </Auth>
                    <About title='React-разработчик Алексей Петров'>
                        <p>
                            Разрабатываю на самом крутом в мире фреймворке
                            <br />
                            самые крутые в мире SPA!
                        </p>
                        <p>С удовольствием и вам что-нибудь разработаю ;)</p>
                    </About>
                    <Articles/>
                </main>
            </div>
        );
    }

}

export default HomePage;
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
                            ABBYY 2020 frontend course project
                            <br />
                            Server-side
                            Сервер расположен по адресу http://abbyyfrontend2020.azurewebsites.net/
                        </p>
                        <p>Код сервера доступен в репозитории: <br/> https://github.com/vasily-shakhov/frontend-2020-server</p>
                    </About>
                    <Articles/>
                </main>
            </div>
        );
    }

}

export default HomePage;
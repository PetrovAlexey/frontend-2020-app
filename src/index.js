import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './components/App/App';

const app = (
    <BrowserRouter>
      <App/>
    </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));
/*ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);*/

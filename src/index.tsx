import React from 'react';
import ReactDOM from 'react-dom';
import {RequestProvider} from 'react-request-hook';
import axios from 'axios';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <RequestProvider value={axios}>
    <App />
    <Alert stack={{limit: 3}} />
  </RequestProvider>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

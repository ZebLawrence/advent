import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import buildStore from './buildStore';
import App from './app/App';
import './assets/styles/bootstrap/bootstrap.scss';
import './index.scss';
import './assets/home.scss';

ReactDOM.render(
    <Provider store={buildStore('https://adventofcode.com')}>
        <App />
    </Provider>, document.getElementById('root')
);

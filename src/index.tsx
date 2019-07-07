import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App/App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import {BrowserRouter as Router} from 'react-router-dom';
import {saveState} from './localStorage/localStorage';
import {throttle} from 'lodash';

const store = configureStore();

store.subscribe(throttle(() => {
    saveState({
        quiz: store.getState().quiz,
        value: store.getState().value,
        navTab: store.getState().navTab,
        theme: store.getState().theme
    });
}, 1000));

if (window.location.hostname.indexOf('localhost') > -1) {
    // @ts-ignore
    window['store'] = store;
}

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

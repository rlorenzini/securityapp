import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';

import App from './App';
import BaseLayout from './components/BaseLayout.js';

// import requireAuth from './components/requireAuth'
import * as serviceWorker from './serviceWorker';
// import reducer from './store/reducers/reducer';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { MovieList } from './components/MovieList';
// import {setAuthenticationHeader} from './utils/authentication';
// import {connect} from 'react-redux';

// const store = createStore(reducer,devToolsEnhancer(
//   // Specify custom devTools options
// ));

// setAuthenticationHeader(localStorage.getItem('jsonwebtoken'))

ReactDOM.render(
    <BrowserRouter>
        <BaseLayout>
            <Switch>
                <Route path='/' exact component={App} />
                <Route path='/movies' component={MovieList} />
            </Switch>
        </BaseLayout>
    </BrowserRouter>
    ,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

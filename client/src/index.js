import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import BaseLayout from './components/BaseLayout.js';
import Login from './components/Login';
import { MovieList } from './components/userMovieList';
import { ExampleMovieList } from './components/exampleMovieList';
import { UserWatchList } from './components/UserWatchList';
import { ExampleWatchList } from './components/ExampleWatchList'

import * as serviceWorker from './serviceWorker';
import reducer from './components/stores/reducers/reducer';
import { setAuthenticationHeader } from './components/utils/authentication';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

setAuthenticationHeader(localStorage.getItem('jsonwebtoken'))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <BaseLayout>
        <Switch>
          <Route path='/' exact component={App} />
          <Route path='/userMovies' component={MovieList} />
          <Route path='/exampleMovies' component={ExampleMovieList} />
          <Route path='/user-watchList' component={UserWatchList} />
          <Route path='/example-watchList' component={ExampleWatchList} />
          <Route path='/login-page' component={Login} />
        </Switch>
      </BaseLayout>
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

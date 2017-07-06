import * as React from 'react';
import AppRouter from './router';
import store from './store';
// 各种Provider
import { Provider } from 'react-redux';

import './static/css/base.css';
import './static/css/app.css';
import './static/css/common.css';
import './static/css/cover.less';
// use $store every where

class App extends React.Component{
  render() {
    return (
        <Provider store={store}>
            <AppRouter/>
        </Provider>
    );
  }
}

export default App;

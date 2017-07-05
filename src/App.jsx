import * as React from 'react';
import AppRouter from './router';
import store from './store';
// 各种Provider
import { Provider } from 'react-redux';

import './static/css/base.css';

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

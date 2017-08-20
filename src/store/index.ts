import { Store, createStore, applyMiddleware } from 'redux'; // applyMiddleware
import rootReducer from './reducer';
import thunkMiddleware from 'redux-thunk';
// 用中间件创建一个store,让它具有异步action功能
let createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware
  )(createStore);
  
var store: Store<any> = createStoreWithMiddleware(rootReducer);

export default store

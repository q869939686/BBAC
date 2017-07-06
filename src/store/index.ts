import { Store, createStore } from 'redux'; // applyMiddleware
import rootReducer from './reducer';
// import applyActions from './middleware/applyActions';
// var initialState: Object = {};
// var createStoreWidthMiddleware = applyMiddleware(applyActions)(createStore);
var store: Store<any> = createStore(
        rootReducer
    );

export default store

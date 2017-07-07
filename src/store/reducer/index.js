import { combineReducers } from 'redux';
import applyMutations from '../middleware/applyMutations';
import common from './common';

const rootReducer = combineReducers(applyMutations({
    common
}));
export default rootReducer;

import { combineReducers } from 'redux';
import applyMutations from '../middleware/applyMutations';
import common from './common';
import getChartData from './getChartData';

const rootReducer = combineReducers(applyMutations({
    common,
    getChartData
}));
export default rootReducer;

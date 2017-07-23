import { States, Action } from '@/types';
import * as types from '../actions/actionTypes';
export default {
    state: {
        isCarLoadingCompleted: false,
        isToPart: false
    },
    // 用 types 作key保证action唯一性
    mutations: {
        [types.LOADING_STATUS] (state: States, action: Action) {
            state.isCarLoadingCompleted = action.payload
        },
        [types.TO_PART] (state: States, action: Action) {
            state.isToPart = action.payload;
        }
    }
}

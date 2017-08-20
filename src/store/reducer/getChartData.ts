import { States, Action } from '@/types';
import * as types from '../actions/actionTypes';

export default {
    state: {
        barData: []
    },
    // 用 action types 作key保证action唯一性
    mutations: {
        /**
         * 处理 changeLoadingStatus
         * @param {boolean} state 默认回传的
         * @param {Action} 
         */
        [types.GET_CHART_DATA] (state: States, action: Action) {
            state.barData = action.payload
        },
    }
}
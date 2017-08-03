import { States, Action } from '@/types';
import * as types from '../actions/actionTypes';
export default {
    state: {
        isCarLoadingCompleted: false,
        isToPart: false,
        isShowChart: false
    },
    // 用 action types 作key保证action唯一性
    mutations: {
        /**
         * 处理 changeLoadingStatus
         * @param {boolean} state 默认回传的
         * @param {Action} 
         */
        [types.LOADING_STATUS] (state: States, action: Action) {
            state.isCarLoadingCompleted = action.payload
        },
        /**
         * 处理 changeToPartStatus
         * @param {boolean} state 默认回传的
         * @param {Action} 
         */
        [types.TO_PART] (state: States, action: Action) {
            state.isToPart = action.payload;
        },
        /**
         * 处理 changeShowChartStatus
         * @param {boolean} state 默认回传的
         * @param {Action}
         */
        [types.SHOW_CHART] (state: States, action: Action) {
            state.isShowChart = action.payload;
        }
    }
}

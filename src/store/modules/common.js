import * as types from '../mutation-types'

// initial state
const state = {
    isCarLoadingCompleted: false,
    isToPart: false,
    isShowChart: false,
    temp: null // 随便存
}

// getters
const getters = {
    isToPart: state => state.isToPart,
    isCarLoadingCompleted: state => state.isCarLoadingCompleted,
    isShowChart: state => state.isShowChart
}

// actions
// const actions = {
//     getAllProducts ({ commit }) {
//         commit(types.RECEIVE_PRODUCTS, [1, 2])
//     }
// }

// mutations
const mutations = {
    /**
     * 处理 changeLoadingStatus
     * @param {object} state 默认回传的
     * @param {boolean}
     */
    [types.LOADING_STATUS] (state, payload) {
        state.isCarLoadingCompleted = payload
    },
    /**
     * 处理 changeToPartStatus
     * @param {object} state 默认回传的
     * @param {boolean}
     */
    [types.TO_PART] (state, payload) {
        state.isToPart = payload;
    },
    /**
     * 处理 changeShowChartStatus
     * @param {object} state 默认回传的
     * @param {boolean}
     */
    [types.SHOW_CHART] (state, payload) {
        state.isShowChart = payload;
    },
    upDateTemp (state, payload) {
        state.temp = payload;
    }
}

export default {
    state,
    getters,
    // actions,
    mutations
}
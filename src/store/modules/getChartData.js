import * as types from '../mutation-types'

// initial state
const state = {
    barData: []
}

// mutations
const mutations = {
    /**
     * 处理 changeLoadingStatus， 调用此方法，页面就更新
     * @param {object} state 默认回传的
     * @param {object}
     */
    [types.GET_CHART_DATA] (state, payload) {
        state.barData = payload
    }
}

export default {
    state,
    mutations
}

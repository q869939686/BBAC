import * as types from '../mutation-types'

// initial state
const state = {
    carPartInfo: {
        id: ''
    }
}

// mutations
const mutations = {
    /**
     * 被点击的部件的信息
     * @param {object} state 默认回传的
     * @param {object}　payload　= {id: String, name: String}
     */
    [types.CAR_PARTS_INFO] (state, payload) {
        state.carPartInfo = payload
    }
}

export default {
    state,
    mutations
}

import * as types from '../mutation-types'

// initial state
const state = {
    carPartInfo: {
        id: ''
    },
    domElement: null,
    carImg: ''
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
    },
    /**
     * canvas
     * @param {object} state 默认回传的
     * @param {Element}
     */
    updateDomElement (state, payload) {
        state.domElement = payload
    },
    /**
     * canvas 转成图片
     * @param {object} state 默认回传的
     * @param {Element}
     */
    updateCarImg (state) {
        if (state.domElement !== null) {
            state.carImg = state.domElement.toDataURL('image/jpeg')
        }
    }
}

export default {
    state,
    mutations
}

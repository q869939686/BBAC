import * as types from '../mutation-types'

// initial state
const state = {
    // 模拟数据
    chartData: [
        [20, 30, 40, 50, 30, 10],
        [120, 230, 40, 50, 30, 10],
        [20, 30, 40, 50, 30, 10],
        [20, 30, 40, 50, 30, 10],
        [120, 230, 40, 50, 30, 10]
    ],
    isShowPart: false,
    // 是否选择了carType，BI页面做出相应的布局变化
    isSelectedCarType: false,
    // Sensor下面的多选是否有值
    isSensorSelect: false
}

// mutations
const mutations = {
    /**
     * 获取图表数据(模拟数据)
     * 调用方式store.commit('GET_CHART_DATA', 参数)
     * @param {object} state 默认回传的
     * @param {object}
     */
    [types.GET_CHART_DATA](state, payload) {
        state.chartData = payload
    },
    /**
     * BI页面 是否展示图表部件
     * @param {Object} state 默认回传的
     * @param {Boolean} payload 
     */
    [types.IS_SHOW_PART](state, payload) {
        state.isShowPart = payload;
    },
    /**
     * 是否选择了carType，改变此状态
     * @param {Object} state 
     * @param {Boolean} payload 
     */
    [types.SELECT_CAR_TYPE](state, payload) {
        state.isSelectedCarType = payload;
    },
    /**
     * Sensor下面的多选是否有值，改变此状态
     * @param {Object} state 
     * @param {Boolean} payload 
     */
    [types.SENSOR_SELECT](state, payload) {
        state.isSensorSelect = payload;
    }
}

export default {
    state,
    mutations
}
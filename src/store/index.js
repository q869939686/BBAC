import Vue from 'vue'
import Vuex from 'vuex'

import common from './modules/common'
import getChartData from './modules/getChartData'
import carParts from './modules/carParts'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        common,
        getChartData,
        carParts
    },
    strict: debug
})

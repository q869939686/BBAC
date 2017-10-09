import Vue from 'vue'
import Vuex from 'vuex'

import common from './modules/common'
import QView from './modules/QView'
import carParts from './modules/carParts'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        common,
        QView,
        carParts
    },
    strict: debug
})
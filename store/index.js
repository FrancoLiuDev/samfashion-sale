import Vue from 'vue'
import Vuex from 'vuex'
import { Store } from 'vuex'
import msservice from './modules/msservice/msservice.js'
import shopcar from './modules/shopcar/shopcar.js'

Vue.use(Vuex)
const store = () =>
  new Vuex.Store({
    state: {
      location: null
    },
    getters: {
      location(state) {
        return state.location
      }
    },
    mutations: {
      setLocation(state, loc) {
        state.location = loc
      }
    },
    modules: { msservice, shopcar },
    actions: {}
  })

export default store

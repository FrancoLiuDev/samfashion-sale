import productlist from './modules/productlist'

export default {
  namespaced: true,
  state: {
    lastError: null
  },
  mutations: {
    apiErrorResponse(state, e) {
      console.log('apiErrorResponse', e)
      state.lastError = e
    }
  },
  modules: { productlist },
  getters: {
    msApiError: state => {
      return state.lastError
    }
  }
}

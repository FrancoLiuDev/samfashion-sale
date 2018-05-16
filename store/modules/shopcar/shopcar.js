export default {
  namespaced: true,
  state: {
    car: []
  },
  mutations: {
    push(state, product) {
      car.push(product)
    }
  },
  getters: {}
}

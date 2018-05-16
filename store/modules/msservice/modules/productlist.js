import { productModule } from "@Requests/msserver/msProduct"

export default {
  strict: true,
  namespaced: true,
  state: {
    list: [],
    response: null,
    err: null
  },
  actions: {
    async getList({ rootState, state }) {
      return new Promise(async (resolve, reject) => {
        try {
          let result = await productModule.getMsProductList()
          if (result.status == 200) {
            state.response = result.data
            state.list = state.response.data
            console.log("  state.list ", result)
          } else {
            state.list = []
          }
          resolve(state.response)
        } catch (e) {
          rootState.msservice.lastError = e
          status.err = e
          reject(e)
        }
      })
    }
  }
}

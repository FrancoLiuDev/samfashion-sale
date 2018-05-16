export default {
  data() {
    return {}
  },
  computed: {
    msApiErrorResponse: {
      get() {
        return this.$store.getters["msservice/msApiError"]
      }
    },
    productList() {
      return this.$store.state.msservice.productlist.list
    }
  },
  watch: {
    msApiErrorResponse() {
      console.log("msApiErrorResponse", this.msApiErrorResponse)
    }
  },

  methods: {
    fectchProductList() {
      return new Promise((resolve, reject) => {
        this.$store
          .dispatch("msservice/productlist/getList")
          .then(result => {
            resolve(result.data)
          })
          .catch(function(reason) {
            reject(reason)
          })
      })
    }
  }
}

/*產品服務類*/

import MsServiceModule from "./msServiceModule"

class MsProductModule extends MsServiceModule {
  constructor() {
    super()
    this.url = "http://localhost:16000"
  }

  getMsProductList() {
    return this.excuteRequest({
      type: "get",
      url: this.url + "/msc/api/v1/product/"
    })
  }

  getMsProduct(Id) {
    return this.excuteRequest({
      type: "get",
      url: this.url + "/msc/api/v1/product/" + Id
    })
  }

  createMsProduct(model) {
    console.log("createMsProduct", model)
    return this.excuteRequest({
      type: "post",
      data: model,
      url: this.url + "/msc/api/v1/product/"
    })
  }

  updateMsProductCover(model) {
    console.log("updateMsProductCover", model)
    return this.excuteRequest({
      type: "post",
      data: model,
      url: this.url + "/msc/api/v1/product/cover"
    })
  }
}
export let productModule = new MsProductModule()

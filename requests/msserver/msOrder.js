/*訂單服務類*/

import MsServiceModule from './msServiceModule'

class MsOrderModule extends MsServiceModule {
  constructor() {
    super()
    this.url = 'http://localhost:16000'
  }
  fectchOrderList() {
    return this.excuteRequest({
      type: 'get',
      url: this.url + '/msc/api/v1/order/'
    })
  }
  createOrRetrieveMsOrder(meta) {
    return this.excuteRequest({
      type: 'post',
      data: meta,
      url: this.url + '/msc/api/v1/order/'
    })
  }
  genMsOrderTrans(orderId) {
    console.log(orderId)
    return this.excuteRequest({
      type: 'post',
      url: this.url + '/msc/api/v1/order/' + orderId + '/trans'
    })
  }
  choiceMsOrderTransMapHtm() {
    console.log('choiceMsOrderTransMapHtm')
    return this.excuteRequest({
      type: 'get',
      url: this.url + '/msc/api/v1/transition/map/htm'
    })
  }
}
export let orderModule = new MsOrderModule()

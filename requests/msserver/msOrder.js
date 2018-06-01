/*訂單服務類*/

import MsServiceModule from './msServiceModule'

class MsOrderModule extends MsServiceModule {
  constructor() {
    super()
    this.url = ''
  }
  createMsOrder(meta) {
    return this.excuteRequest({
      type: 'post',
      data: meta,
      url: this.url + '/msc/api/v1/order/'
    })
  }
  deleteMsOrder(id) {
    return this.excuteRequest({
      type: 'delete',
      url: this.url + '/msc/api/v1/order/'+ id
    })
  }
  listMsOrders() {
    console.log('listMsOrders')
    return this.excuteRequest({
      type: 'get',
      url: this.url + '/msc/api/v1/order/'
    })
  }
  
}
let orderModule = new MsOrderModule()
export default orderModule

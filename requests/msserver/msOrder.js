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
  
}
let orderModule = new MsOrderModule()
export default orderModule

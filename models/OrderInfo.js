class OrderInfo {
  constructor() {}
  load(model) {
    for (var key in model) {
      this['_' + key] = model[key]
    }
  }
  get cover() {
    return this._cover ? this._cover : ''
  }
  get title() {
    return this._title ? this._title : ''
  }
  get price() {
    return this._price ? this._price : ''
  }
  get productId() {
    return this._productId ? this._productId : ''
  }
}

export default OrderInfo

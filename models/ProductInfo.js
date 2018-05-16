class ProductInfo {
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
  get meta() {
    return this._meta ? this._meta : {}
  }
  get productId() {
    return this._primaryKey ? this._primaryKey : ''
  }
}

export default ProductInfo

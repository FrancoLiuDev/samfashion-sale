class ProductRow {
  constructor(model) {
    for (var key in model) {
      this[key] = model[key]
    }
    this.image =
      '<div><img width="80" height="auto" src="' + this.cover + '"></div>'
  }
}

export default ProductRow

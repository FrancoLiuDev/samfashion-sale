class OrderIiemInfo {
  constructor() {
    this.init()
  }
  load(model) {
    for (var key in model) {
      this['_' + key] = model[key]
    }
  }
  init() {
    this._saleMember = ''
    this._orderPhone = ''
    this._orderAddr = ''
    this._orderOther = ''
    this._orderPrice = []
  }
  packNewData() {
    return {
      saleMember: this._saleMember,
      orderPhone: this._orderPhone,
      orderAddr: this._orderAddr,
      orderSpec: 'updata.orderSpec',
      orderPrice: this._orderPrice.toString(),
      orderOther: this._orderOther,
    }
  }
  
  get orderDateNumber() {
    var date = new Date(this._createDate)
    var month = date.getMonth()+1
    var dates = date.getDate()
    
    var displayDate = String("00"+ month).slice(-2) +  String("00"+ dates).slice(-2)

    return displayDate + String("000"+ this._orderDateNumber).slice(-3)
    //return date.getUTCMonth()
  }
  get dateDisplay() {
    var date = new Date(this._createDate)
    var month = date.getMonth()+1
    var dates = date.getDate()

    var displayDate = String("00"+ month).slice(-2) +  String("00"+ dates).slice(-2)

    return date.toLocaleDateString() + " "+ date.toLocaleTimeString()
  }
  get saleMember() {
    return this._saleMember ? this._saleMember : ''
  } 
 


  get orderPhone() {
    return this._orderPhone ? this._orderPhone : ''
  }
  get orderAddr() {
    return this._orderAddr ? this._orderAddr : ''
  }
  get orderOther() {
    return this._orderOther ? this._orderOther : ''
  }
  get orderPrice() {
    return this._orderPrice ? JSON.parse("[" + this._orderPrice + "]") : ''
  }

  set saleMember(val) {
    this._saleMember = val
  }
  set orderPhone(val) {
    this._orderPhone = val
  }
  set orderAddr(val) {
    this._orderAddr = val
  }
  set orderOther(val) {
    this._orderOther = val
  }
  set orderPrice(val) {
    this._orderPrice = val
  }
}

export default OrderIiemInfo

var UserMeta = function() {
  this.model = {
    name: "model",
    prop: "prop"
  }
}
var usertype = UserMeta.prototype
usertype.__defineGetter__("name", function() {
  console.log("getter", this.model.name)
  return this.model.name
})

UserMeta.prototype.getModel = function() {
  return this.model
}

export { UserMeta }

const DomainResult = require(__exception + '/DomainResult')

module.exports = {
	isControllerException: function(exception) {
		if (exception.success == null) return false
		if (exception.code == null) return false
		return true
	}
}

const Mutation = require(__exception + '/Mutation')

class MscModuleBase {
	constructor() {}
	reportMutation(success, code, data, error) {
		return Mutation.createMutation(success, code, data, error)
	}
}

module.exports = MscModuleBase

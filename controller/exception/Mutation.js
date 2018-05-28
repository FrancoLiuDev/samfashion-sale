const MODULE_ERROR_NODATA = -1
const MODULE_ERROR_SUCCESS = 0
const MODULE_ERROR_UNHANDLE = -999
let errors = {
	MODULE_ERROR_SUCCESS,
	MODULE_ERROR_NODATA,
	MODULE_ERROR_UNHANDLE
}

class ModuleMutation {
	static createMutation(success, code, data, error) {
		return {
			success: success,
			code: code,
			data: data,
			error: error
		}
	}
	static codes() {
		return errors
	}
}

module.exports = ModuleMutation

const RESULT_SUCCESS = '0'
const RESULT_RECORD_NOTFOUND = '-1100'
const RESULT_ERROR_UNKNOW = '-1200'

let results = {
	RESULT_SUCCESS,
	RESULT_RECORD_NOTFOUND,
	RESULT_ERROR_UNKNOW
}

function mapHttpResponse(code) {
	switch (code) {
		case RESULT_SUCCESS:
			return 200
			break
		case RESULT_RECORD_NOTFOUND:
			return 204
			break
		default:
			return 500
	}
}

class DomainResult {
	constructor(isSuccess, code) {
		this._success = isSuccess
		this._code = code
		this._data = null
		this._reason = null
	}

	// setsuccess(isSuccess) {
	// 	this._success = isSuccess
	// 	return this
	// }

	// setcode(code) {
	// 	this._code = code
	// 	return this
	// }

	setdata(data) {
		this._data = data
		return this
	}

	setreason(reason) {
		this._reason = reason
		return this
	}

	serialize() {
		var result = {}
		if (this._success != null) result['success'] = this._success
		if (this._code != null) result['code'] = this._code
		if (this._data != null) result['data'] = this._data
		if (this._reason != null) result['reason'] = this._reason

		result['status'] = mapHttpResponse(this._code)
		return result
	}
	static build(isSuccess, code) {
		return new DomainResult(isSuccess, code)
	}

	static results() {
		return results
	}
}

module.exports = DomainResult

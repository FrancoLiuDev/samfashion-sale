const MscController = require(__controllers + '/msc/MscController')
const MscOrderModule = require('../module/mscOrderModule')
const DomainResult = require(__exception + '/DomainResult')

let mscOrderModule = new MscOrderModule()

class MscOrderController extends MscController {
	constructor() {
		super()
	}
	readOrder(id) {
		return mscOrderModule.readOrder(id)
	}
	async createRetrieveOrder(user, orderMeta) {
		return new Promise(async function(resolve, reject) {
			console.log('createRetrieveOrder')
		    resolve(
				DomainResult.build(true, DomainResult.results().RESULT_SUCCESS)
					.serialize()
			)
		})
	}

}

module.exports = MscOrderController

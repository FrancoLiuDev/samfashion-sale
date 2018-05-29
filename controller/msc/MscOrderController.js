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
			try {
				var mutation = await mscOrderModule.patchCreateOrder(user, orderMeta)
				console.log('result', mutation)
				resolve(
					DomainResult.build(true, DomainResult.results().RESULT_SUCCESS)
						.setdata(mutation.data)
						.serialize()
				)
			} catch (e) {
				reject(
					DomainResult.build(false, DomainResult.results().RESULT_ERROR_UNKNOW)
						.setreason(e)
						.serialize()
				)
			}
		})
	}

}

module.exports = MscOrderController

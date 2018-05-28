const OrderSchema = require(__schema + '/order')
const Serializer = require('sequelize-to-json')
let orderSchema = OrderSchema.mainOrder()
//let packegeSchema = OrderSchema.orderPackege()

class MscOrderModule {
	constructor() {}
	readOrder(id) {
		let self = this
		return new Promise(function(resolve, reject) {
			const scheme = {
				include: ['@all', 'meta'],
				exclude: ['@fk'],
				assoc: {
					// scheme to be used for the associated `User` instance
					meta: {
						exclude: ['@pk', '@fk']
					}
				}
			}

			orderSchema
				.find({
					// include: [
					// 	{
					// 		model: packegeSchema,
					// 		as: 'meta',
					// 		where: {
					// 			orderId_fkl: id
					// 		}
					// 	}
					// ],
					where: {
						orderId: id
					}
				})
				.then(function(data) {
					let serializer = new Serializer(orderSchema, scheme)
					let postAsJSON = serializer.serialize(data)
					resolve(postAsJSON)
				})
				.catch(err => console.log(err))
		})
	}

	patchCreateOrder(user, packege) {
		let self = this
		return new Promise(function(resolve, reject) {
			return OrderSchema.getSequelize()
				.transaction(function(t) {
					return self._createOrder(user, packege, null)
				})
				.then(function(result) {
					resolve(result)
					console.log('Transaction has been committed')
				})
				.catch(function(err) {
					reject(err)
					console.log(' rolled back')
				})
		})
	}

	_createOrder(user, packege, transation) {
		let self = this
		return new Promise(function(resolve, reject) {
			var now = Date.now()
			orderSchema
				.create(
					{
						ownerId: user,
						status: '0',
						createDate: now
					},
					{ transaction: transation }
				)
				.then(async function(p) {
					console.log('tran t pass', p)
					var orderId = p.orderId
					for (var index in packege) {
						var element = packege[index]
						//var x = await self._createPackageItem(orderId, element, transation)
					}
					console.log('now resolve')
					resolve('pass')
				})
				.catch(function(err) {
					console.log('failed: ' + err)
					reject(err)
				})
		})
	}

	// _createPackageItem(orderId, packItem, transation) {
	// 	let self = this
	// 	return new Promise(function(resolve, reject) {
	// 		var now = Date.now()
	// 		packegeSchema
	// 			.create(
	// 				{
	// 					orderId: orderId,
	// 					quantity: packItem.cnt,
	// 					productId: packItem.productId,
	// 					size: packItem.attributes.size,
	// 					color: packItem.attributes.color,
	// 					createDate: now
	// 				},
	// 				{ transaction: transation }
	// 			)
	// 			.then(function(p) {
	// 				resolve(p)
	// 			})
	// 			.catch(function(err) {
	// 				reject(err)
	// 			})
	// 	})
	// }
}

module.exports = MscOrderModule

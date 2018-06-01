
const MscOrderController = require(__controllers + '/msc/MscOrderController')
const mscOrderController = new MscOrderController()

function MainSevice(app) {
    //建築列表
    app.post('/msc/api/v1/order/', async function(req, res) {
		console.log('post order',req.body)
	    updata = req.body
		mscOrderController
			.createRetrieveOrder('1', {
				saleMember:updata.saleMember,
				orderPhone:updata.orderPhone,
				orderAddr:updata.orderAddr,
				orderSpec:updata.orderSpec,
				orderPrice:updata.orderPrice,
				orderOther:updata.orderOther,
			})
			.then(result => {
                console.log('ok')
				res.status(result.status).send(result)
			})
			.catch(err => {
                console.log('err',err)
				// if (appUtils.isControllerException(err)) {
				// 	console.log('order/:id', err)
				// 	res.status(err.status).send(err)
				// } else {
				// 	console.log(err)
				// 	res.status(500).send(err)
				// }
			})
	})
	app.get('/msc/api/v1/order/', async function(req, res) {	 
		mscOrderController
			.readOrderList()
			.then(result => {
                console.log('ok')
				res.status(result.status).send(result)
			})
			.catch(err => {
                console.log('err',err)
				// if (appUtils.isControllerException(err)) {
				// 	console.log('order/:id', err)
				// 	res.status(err.status).send(err)
				// } else {
				// 	console.log(err)
				// 	res.status(500).send(err)
				// }
			})
	})
    app.delete('/msc/api/v1/order/:id', async function(req, res) {	 
		var id = req.params.id
		console.log('delete',id)
		mscOrderController
			.deleteOrderById(id)
			.then(result => {
                console.log('ok')
				res.status(result.status).send(result)
			})
			.catch(err => {
                console.log('err',err)
				// if (appUtils.isControllerException(err)) {
				// 	console.log('order/:id', err)
				// 	res.status(err.status).send(err)y
				// } else {
				// 	console.log(err)
				// 	res.status(500).send(err)
				// }
			})
	})
	 
}

module.exports = MainSevice
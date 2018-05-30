
const MscOrderController = require(__controllers + '/msc/MscOrderController')
const mscOrderController = new MscOrderController()

function MainSevice(app) {
    //建築列表
    app.post('/msc/api/v1/order/', async function(req, res) {
		console.log('post order')
	 
		mscOrderController
			.createRetrieveOrder('1', {
				saleMember:7,
				orderPhone:'0939548880',
				orderAddr:'台北地址',
				orderSpec:'M',
				orderPrice:[8,2,2,2,2].toString(),
				orderOther:'其他說明'
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
}

module.exports = MainSevice
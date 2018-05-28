
const MscOrderController = require(__controllers + '/msc/MscOrderController')
const mscOrderController = new MscOrderController()

function MainSevice(app) {
    //建築列表
    app.post('/msc/api/v1/order/', async function(req, res) {
		console.log('post order')
	 
		mscOrderController
			.createRetrieveOrder('1', {})
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
const MscOrderController = require(__controllers + '/msc/MscOrderController')
const mscOrderController = new MscOrderController()
const appUtils = require(__utils + '/timeUtil')
const timeUtil = require(__utils + '/timeUtil')
function MainSevice(app) {

  app.post('/msc/api/v1/order/', async function (req, res) {
    console.log('post order', req.body)
    updata = req.body
    mscOrderController
      .createRetrieveOrder('1', {
        saleMember: updata.saleMember,
        orderPhone: updata.orderPhone,
        orderAddr: updata.orderAddr,
        orderSpec: updata.orderSpec,
        orderPrice: updata.orderPrice,
        orderOther: updata.orderOther,
      })
      .then(result => {
        console.log('ok')
        res.status(result.status).send(result)
      })
      .catch(err => {
        console.log('err', err)
        res.status(err.status).send(err)
      })
  })
  app.put('/msc/api/v1/order/', async function (req, res) {
    console.log('get list ', req.body)
    var condition = req.body
    mscOrderController
      .readOrderList(condition)
      .then(result => {
        console.log('ok')
        res.status(result.status).send(result)
      })
      .catch(err => {
        console.log('err', err)
        res.status(err.status).send(err)
        // if (appUtils.isControllerException(err)) {
        // 	console.log('order/:id', err)
        // 	res.status(err.status).send(err)
        // } else {
        // 	console.log(err)
        // 	res.status(500).send(err)
        // }
      })
  })
  app.delete('/msc/api/v1/order/:id', async function (req, res) {
    var id = req.params.id
    console.log('delete', id)
    mscOrderController
      .deleteOrderById(id)
      .then(result => {
        console.log('ok')
        res.status(result.status).send(result)
      })
      .catch(err => {
        console.log('err', err)
        res.status(err.status).send(err)
        // if (appUtils.isControllerException(err)) {
        // 	console.log('order/:id', err)
        // 	res.status(err.status).send(err)y
        // } else {
        // 	console.log(err)
        // 	res.status(500).send(err)
        // }
      })
  })
  app.get('/msc/api/v1/timezone', async function (req, res) {
    console.log('time')
    twDate = appUtils.genTwDate()
    
    var now =  timeUtil.genTwDate()//
    var sixoneDate = new Date(Date.UTC(2018, 06, 01, 0, 0, 0))
     
    var dStart =  timeUtil.convertTwDateToUtcDate(new Date(Date.UTC(2018, 05, 01, 0, 0, 0)))//
    var dEnd =  timeUtil.convertTwDateToUtcDate(new Date(Date.UTC(2018, 05, 01, 23, 59, 59)))
     
    var nowtime = new Date()  
           
    res.status(200).send({
      between: [dStart, dEnd],
      now:now.toLocaleString(),

      sixoneDate:sixoneDate.toUTCString(),
      nowtime:nowtime.getTime()


    } )
   

  })

}

module.exports = MainSevice

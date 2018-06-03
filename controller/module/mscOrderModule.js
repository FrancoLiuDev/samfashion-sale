const OrderSchema = require(__schema + '/order')
const Serializer = require('sequelize-to-json')
const MscModuleBase = require('./mscModuleBase')
const timeUtil = require(__utils + '/timeUtil')

let orderSchema = OrderSchema.mainOrder()
let configTable = OrderSchema.configTable()
const Mutation = require(__exception + '/Mutation')
class MscOrderModule extends MscModuleBase{
  constructor() {
    super()
  }
  readOrder(id) {
    let self = this
    return new Promise(function (resolve, reject) {
      const scheme = {
        include: ['@all', 'meta'],
        exclude: ['@fk'],
        assoc: {
          meta: {
            exclude: ['@pk', '@fk']
          }
        }
      }

      orderSchema
        .find({
          where: {
            orderId: id
          }
        })
        .then(function (data) {
          let serializer = new Serializer(orderSchema, scheme)
          let postAsJSON = serializer.serialize(data)
          resolve(postAsJSON)
        })
        .catch(err => console.log(err))
    })
  }
  deleteOrder(id){
    let self = this
    return new Promise(function (resolve, reject) {
      orderSchema
        .destroy({
          where: {
            orderId:id
          }
        })
        .then(function (result) {
          resolve(self.reportMutation(true, Mutation.codes().MODULE_ERROR_SUCCESS, result, null))
        })
        .catch(err => console.log(err))
    })
  }
  readOrderList(confition) {
    let self = this
    var wherequery = {}
    var conditionCreateDate = null

    if (confition.month && confition.date){
      var dStart =  timeUtil.convertTwDateToUtcDate(new Date(confition.month+"/"+confition.date+"/2018 0:00:0:0"))//
      var dEnd =  timeUtil.convertTwDateToUtcDate(new Date(confition.month+"/"+confition.date+"/2018 23:59:59:0"))
      wherequery['createDate'] = {
        $between: [dStart, dEnd]
      }
      console.log('dStart',dStart.toLocaleString())
      console.log('dEnd',dEnd.toLocaleString())
    }


    if (confition.order){
      wherequery['orderDateNumber'] = confition.order
    }
    return new Promise(function (resolve, reject) {
      // var dStart = new Date("5/01/2018 0:00:0:0")
      // var dEnd = new Date("6/1/2018 0:00:0:0")
      orderSchema
        .findAll({
          where: wherequery
        })
        .then(function (data) {
          let serializer = Serializer.serializeMany(data, orderSchema)
          resolve(self.reportMutation(true, Mutation.codes().MODULE_ERROR_SUCCESS, serializer, null))
        })
        .catch(err => console.log(err))
    })
  }
  patchCreateOrder(user, packege) {
    let self = this
    return new Promise(function (resolve, reject) {
      return OrderSchema.getSequelize()
        .transaction(function (t) {
          return self._createOrder(user, packege, null)
        })
        .then(function (result) {
          resolve(self.reportMutation(true, Mutation.codes().MODULE_ERROR_SUCCESS, result, null))
          console.log('Transaction has been committed')
        })
        .catch(function (err) {
          reject(err)
          console.log(' rolled back')
        })
    })
  }

  _createOrder(user, packege, transation) {
    let self = this
    return new Promise(function (resolve, reject) {
      var now = new Date()
      console.log('now time', now.toDateString())
      orderSchema
        .create({
          saleMember:packege.saleMember,
          orderPhone:packege.orderPhone,
          orderAddr:packege.orderAddr,
          orderSpec:packege.orderSpec,
          orderPrice:packege.orderPrice,
          orderOther:packege.orderOther,
          orderDateNumber:packege.orderDateNumber,
          ownerId:1,
          createDate: now
        }, {
          transaction: transation
        })
        .then(async function (p) {
          console.log('tran t pass', p)
          resolve('pass')
        })
        .catch(function (err) {
          console.log('failed: ' + err)
          reject(err)
        })
    })
  }

  readOrderConfig() {
    let self = this
    return new Promise(function (resolve, reject) {
      configTable
        .findOne()
        .then(function (data) {
          let serializer = new Serializer(configTable)
          let postAsJSON = serializer.serialize(data)
          resolve(postAsJSON)
        })
        .catch(err => console.log(err))
    })
  }

  getNextOrderId() {
    let self = this
    return new Promise(async function (resolve, reject) {
      var configData = await self.readOrderConfig()
      var twDate = timeUtil.genTwDate()
      var ordertime =  timeUtil.convertUTCDateToTwDate(new Date(configData.countDate))
      console.log('configData',configData)
      console.log('time',twDate,ordertime)
      console.log('year',twDate.getFullYear(),ordertime.getFullYear())
      console.log('month',twDate.getMonth(),ordertime.getMonth())
      console.log('day',twDate.getDate() ,ordertime.getDate())
      console.log('getHours',twDate.getHours() ,ordertime.getHours())
     
      if (twDate.getFullYear() != ordertime.getFullYear() || twDate.getMonth() != ordertime.getMonth() || twDate.getDate() != ordertime.getDate()) {
        await self.makeNewDateOrderIndex(configData)
      }  
      configData = await self.readOrderConfig(configData)
      resolve({
        number: configData.countIndex,
        date: configData.countDate
      })
    })

  }
  updateNextOrderId(index){
    return new Promise(function (resolve, reject) {
      configTable
      .update({
        countIndex: index,
      }, {
          where: {
            index: 1
          }
      })
      .then(function(record) {
        resolve(record)
      })
      .catch(function(err) {
          var mutation = self.reportMutation(false, Mutation.codes().MODULE_ERROR_UNHANDLE, err)
          reject(mutation)
          console.log('err', err)
      })
      
    })
  }

  makeNewDateOrderIndex(lastconfigData) {
    return new Promise(function (resolve, reject) {
      var nowtime = new Date();
      var lastDate = new Date(lastconfigData.countDate);
      console.log('makeNewDateOrderIndex !')
      configTable
      .update({
        countDate: nowtime,
        lastDate:lastDate,
        localDate:nowtime.toLocaleString(),
        lastlocalDate:lastDate.toLocaleString(),
        countIndex: '1',
      }, {
          where: {
            index: 1
          },
          returning: true
      })
      .then(function(record) {
        resolve(record)
      })
      .catch(function(err) {
          // var mutation = self.reportMutation(false, Mutation.codes().MODULE_ERROR_UNHANDLE, err)
          // reject(mutation)
          console.log('err', err)
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

const MscController = require(__controllers + '/msc/MscController')
const MscOrderModule = require('../module/mscOrderModule')
const DomainResult = require(__exception + '/DomainResult')
const asyncMutex = require('async-mutex').Mutex;
const mutex = new asyncMutex();
let mscOrderModule = new MscOrderModule()

class MscOrderController extends MscController {
  constructor() {
    super()
  }
  readOrder(id) {
    return mscOrderModule.readOrder(id)
  }
  readOrderList(condition) {
    return new Promise(async function (resolve, reject) {
      console.log('createRetrieveOrder')
      try {
        var mutation = await mscOrderModule.readOrderList(condition)
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
  deleteOrderById(id) {
    return new Promise(async function (resolve, reject) {
      console.log('deleteOrderById:',id)
      try {
        var mutation = await mscOrderModule.deleteOrder(id)
        console.log('result', mutation)
        resolve(
          DomainResult.build(true, DomainResult.results().RESULT_SUCCESS)
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
  createRetrieveOrder(user, orderMeta) {
    return new Promise(function (resolve, reject) {
      console.log('createRetrieveOrder')
      mutex
        .acquire()
        .then(async function (release) {
			try {
				console.log('release',release)
				var configData = await mscOrderModule.getNextOrderId()
				orderMeta.orderDateNumber = configData.number
				console.log('orderMeta', orderMeta)
				var mutation = await mscOrderModule.patchCreateOrder(user, orderMeta)
				console.log('result', mutation)
				await mscOrderModule.updateNextOrderId(configData.number + 1)

				release()
				resolve(
				  DomainResult.build(true, DomainResult.results().RESULT_SUCCESS)
				  //.setdata(mutation.data)
				  .serialize()
				)
			  } catch (e) {
				release()
				reject(
				  DomainResult.build(false, DomainResult.results().RESULT_ERROR_UNKNOW)
				  .setreason(e)
				  .serialize()
				)
			  }
        });
      
    })
  }

}

module.exports = MscOrderController

const Sequelize = require("sequelize")
const timezone = 'Asia/Taipei'
let config = require(__config + "/productDbCfg")
let msproductDb = null
let msuserDb = null
let msorderDb = null

require('moment').tz.setDefault(timezone)

const createDbConn = function(name) {
	const sequelize = new Sequelize(name, config.user, config.pwd, {
		host: config.host,
		dialect: "mysql", //choose anyone between them
		pool: {
			max: 5,
			min: 0,
			idle: 10000
		}
		//timezone: timezone
	})

	sequelize
		.authenticate()
		.then(() => {
			console.log(name + "Connection has been established successfully.")
		})
		.catch(err => {
			console.log(name + "Unable to connect to the database:", err)
		})

	return sequelize
}

class MscdataConnection {
	constructor() {}
	static product() {
		if (!msproductDb) msproductDb = createDbConn("dd_product")
		return msproductDb
	}

	static user() {
		if (!msuserDb) msuserDb = createDbConn("dd_user")
		return msuserDb
	}

	static order() {
		if (!msorderDb) msorderDb = createDbConn("dd_samOrderRepo")
		return msorderDb
	}
}

module.exports = MscdataConnection

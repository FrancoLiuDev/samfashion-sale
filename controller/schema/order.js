const Sequelize = require('sequelize')
const MscDbConn = require(__base + '/SeqDbConn')
const sequelize = MscDbConn.order()

var order_tbl = sequelize.define(
	'order_tbl',
	{
		orderId: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		ownerId: {
			type: Sequelize.INTEGER,
			allowNull: true,
			primaryKey: false
		},
		createDate: {
			type: Sequelize.DATE,
			allowNull: false,
			primaryKey: false
		}
	},
	{
		freezeTableName: true,
		timestamps: false
	}
)

class OrderSchema {
	constructor() {}
	static getSequelize() {
		return sequelize
	}
	static mainOrder() {
		return order_tbl
	}
	 
}

module.exports = OrderSchema

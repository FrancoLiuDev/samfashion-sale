const Sequelize = require('sequelize')
const MscDbConn = require(__base + '/SeqDbConn')
const sequelize = MscDbConn.order()
var moment = require('moment');

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
			// get: function() {
			// 	return moment.utc(this.getDataValue('createDate')).format('YYYY-MM-DD HH:mm')
			// }
		
		},
		orderDateNumber: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: false
		},
        saleMember: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: false
		},
		orderPhone: {
			type: Sequelize.STRING,
			allowNull: false,
			primaryKey: false
		},
		orderAddr: {
			type: Sequelize.STRING,
			allowNull: false,
			primaryKey: false
		},
		orderSpec: {
			type: Sequelize.STRING,
			allowNull: false,
			primaryKey: false
		},
		orderPrice: {
			type: Sequelize.STRING,
			allowNull: false,
			primaryKey: false
		},
		orderOther: {
			type: Sequelize.STRING,
			allowNull: false,
			primaryKey: false
		}
	},
	{
		freezeTableName: true,
		timestamps: false
	}
)


var order_config_tbl = sequelize.define(
	'order_config',
	{
		index: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		countIndex: {
			type: Sequelize.INTEGER,
			autoIncrement: false,
			primaryKey: true
		},
		countDate: {
			type: Sequelize.DATE,
			allowNull: false,
			primaryKey: false
			// get: function() {
			// 	return moment.utc(this.getDataValue('createDate')).format('YYYY-MM-DD HH:mm')
			// }
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
	static configTable(){
		return order_config_tbl
	} 
	 
}

module.exports = OrderSchema

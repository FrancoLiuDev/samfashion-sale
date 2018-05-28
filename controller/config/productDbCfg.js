const genProductConfig = function() {
	console.log("DB_IPADDR", process.env.DB_IPADDR)

	var dbHost = "35.231.99.193"

	if (process.env.DB_IPADDR) {
		dbHost = process.env.DB_IPADDR
	}

	return {
		host: dbHost,
		user: "root",
		pwd: "root"
	}
}

dbconfig = genProductConfig()
module.exports = dbconfig

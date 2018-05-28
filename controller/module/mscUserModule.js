const MemberSchema = require(__schema + '/smcSchema/user')
const Serializer = require('sequelize-to-json')
let memberSchema = MemberSchema.mainUser()

class MscUserModule {
	constructor() {}
	readUser(id) {
		let self = this
		return new Promise(function(resolve, reject) {
			const scheme = {
				exclude: ['@fk']
			}
			memberSchema
				.find({
					where: {
						memberId: id
					}
				})
				.then(function(data) {
					console.log('user data', data)
					let serializer = new Serializer(memberSchema, scheme)
					let postAsJSON = serializer.serialize(data)
					resolve(postAsJSON)
				})
				.catch(err => console.log(err))
		})
	}
}

module.exports = MscUserModule

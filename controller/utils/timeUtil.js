module.exports = {
	genTwDate: function() {
		var nowtime = new Date()
		var localTime = nowtime.getTime();
		var localOffset = nowtime.getTimezoneOffset() * 60000
		var utc = localTime + localOffset 
		var twtime = utc + 28800000
		var twDate = new Date(twtime)
		 
		return twDate
	},
	convertUTCDateToTwDate(date){
		var localTime = date.getTime();
		var localOffset = date.getTimezoneOffset() * 60000
		var utc = localTime + localOffset 
		var twtime = utc + 28800000
		var twDate = new Date(twtime)
		return twDate
	},
	convertTwDateToUtcDate(date){
		var localTime = date.getTime();
		var localOffset = date.getTimezoneOffset() * 60000
		var utc = localTime + localOffset
		var twDate = new Date(utc)
		return twDate
	} 
}

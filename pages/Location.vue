<template>
	<section class="container">
		<div>
			{{localtime}} <br>
			{{Toronto}}
		</div>
	</section>
</template>

<script>
import moment from 'moment-timezone'
 
export default {
	components: {},
	mounted() {
		
	},
	computed:{
		localtime:function(){
			var nowtime = new Date()
			var offset = new Date().getTimezoneOffset();
			//return  nowtime.toLocaleString()
			return  nowtime.getMonth()+1+"/"+nowtime.getDate()+" "+nowtime.getHours()+":"+nowtime.getMinutes()+" "+Intl.DateTimeFormat().resolvedOptions().timeZone
		},
		Toronto:function(){
			var nowtime = new Date()
			var localTime = nowtime.getTime();
			var localOffset = nowtime.getTimezoneOffset() * 60000
			var utc = localTime + localOffset 
            var tortiem = utc + 28800000
			var torDate = new Date(tortiem)
			//return  nowtime.toLocaleString()
			return  torDate.getMonth() + 1 + "/" + torDate.getDate() + " " + torDate.getHours() + ":" + torDate.getMinutes() 
		}
	}
}
</script>

<style>
.container {
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
}

.title {
	font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
		Arial, sans-serif; /* 1 */
	display: block;
	font-weight: 300;
	font-size: 100px;
	color: #35495e;
	letter-spacing: 1px;
}

.subtitle {
	font-weight: 300;
	font-size: 42px;
	color: #526488;
	word-spacing: 5px;
	padding-bottom: 15px;
}

.links {
	padding-top: 15px;
}
</style>

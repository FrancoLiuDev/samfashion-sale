<template>
	<div>
		<Table stripe :columns="colsProdutList" :data="rowList"></Table>
	</div>
</template>

<script>
import interactor from './interactor.js'
import columns from '@Mixins/fuctional/columns'

export default {
	mixins: [interactor, columns],
	data() {
		return {}
	},
	components: {},
	mounted() {},
	methods: {
		onPack(item) {
			console.log('item', item)
			this.$router.push({ name: 'productDetail', query: { key: item.row.primaryKey } })
		}
	}
}
</script>

<style lang="less"scoped>

</style>

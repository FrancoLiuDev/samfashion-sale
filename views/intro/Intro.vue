<template>
	<div>
		<!-- <b-table striped hover :items="items" :fields="fields"></b-table> -->
	</div>
</template>

<script>
import interactor from './interactor.js'
import columns from '@Mixins/fuctional/columns'

export default {
    mixins: [interactor, columns],
    data() {
        return {
            fields: [ 'first_name', 'last_name', 'age' ],
            items: [
                { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
                { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
                { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
                { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
            ]
        }
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

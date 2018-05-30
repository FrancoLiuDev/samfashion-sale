<template>
	<div>
		<!-- <b-table striped hover :items="items" :fields="fields"></b-table> -->
        <div id="order-delivery">
                    <div id="delivery-header" class="header">
                        <span class="cell-product">訂購人資訊</span>
                    </div>
                </div>
                <div class="list-content">
                    <div class="cell-list-item">
                        <span class="cell-title">收件人:</span>
                        <b-form-input class="input-field" type="text" size="sm" placeholder="姓名"></b-form-input>
                    </div>
                    <div class="cell-list-item">
                        <span class="cell-title">手機:</span>
                        <b-form-input class="input-field" type="text" size="sm" placeholder="姓名"></b-form-input>
                    </div>
                    <div class="cell-list-item">
                        <span class="cell-title">配送門市:</span>
                        <b-form-input class="input-field" type="text" size="sm" placeholder="門市"></b-form-input>
                    </div>
                </div>
	</div>
</template>

<script>
import interactor from './interactor.js'
import columns from '@Mixins/fuctional/columns'
import msRequest from '@Requests/msserver/msOrder'

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
    mounted() {
        console.log('mounted')
        msRequest.createMsOrder({})
       // msRequest.listMsOrders()

    },
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

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
                <span class="cell-title">業務:</span>
                <b-form-input v-model="orderInfo.saleMember" class="input-field" type="text" size="sm" placeholder="業務"></b-form-input>
            </div>
            <div class="cell-list-item">
                <span class="cell-title">手機:</span>
                <b-form-input  v-model="orderInfo.orderPhone" class="input-field" type="text" size="sm" placeholder="手機"></b-form-input>
            </div>
            <div class="cell-list-item">
                <span class="cell-title">地址:</span>
                <b-form-input  v-model="orderInfo.orderAddr" class="input-field" type="text" size="sm" placeholder="地址"></b-form-input>
            </div>
            <div class="cell-list-item">
                <span class="cell-title">價格:</span>
                <div class="price-contain">
                    <div class="price-items" v-for="(item,index) in orderInfo.orderPrice" :key="index">
                        {{index}}:{{item}}
                        <div class="del-item" v-on:click="onRemocePrice(index)">X</div>
                    </div>
                    <div>
                        <b-form-input v-model="valAddPrice" class="input-field" type="text" size="sm" placeholder="備註"></b-form-input>
                    </div>
                    <b-button size="sm" id="bt-addprice" v-on:click="onAddPrice" >
                        +
                    </b-button>
                </div>
            </div>
            <div class="cell-list-item">
                <span class="cell-title">備註:</span>
                <b-form-input  v-model="orderInfo.orderOther" class="input-field" type="text" size="sm" placeholder="備註"></b-form-input>
            </div>
            <b-button size="sm" v-on:click="onSubmitNewOrder" >
                       提交
            </b-button>
        </div>
    </div>
</template>

<script>
import interactor from './interactor.js'
import columns from '@Mixins/fuctional/columns'
import msRequest from '@Requests/msserver/msOrder'
import OrderInfo from '@Models/OrderInfo'
export default {
    mixins: [interactor, columns],
    data() {
        return {
            fields: ['first_name', 'last_name', 'age'],
            items: [
                { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
                { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
                { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
                { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
            ],
            
            valAddPrice:'',
            orderInfo: new OrderInfo()
        }
    },
    components: {},
    watch:{
      'orderInfo.saleMember':function(newVal){
          console.log(newVal)
      }
    },
    mounted() {
        console.log('mounted')
        //msRequest.createMsOrder({})
        // msRequest.listMsOrders()
    },
    methods: {
        onPack(item) {
            console.log('item', item)
            this.$router.push({ name: 'productDetail', query: { key: item.row.primaryKey } })
        },
        onAddPrice(){
            console.log('onAddPrice')
            this.orderInfo.orderPrice.push(this.valAddPrice)
        },
        onRemocePrice(index){
            this.orderInfo.orderPrice.splice(index, 1);
        },
        onSubmitNewOrder(){
            msRequest.createMsOrder(this.orderInfo.packNewData())
        }
    }
}
</script>

<style lang="less"scoped>
#bt-addprice{
   height:30px;
   margin-left:5px; 
}
.price-items {
    display: flex;
    width: auto;
    height: 30px;
   
    margin-right: 10px;
}
.del-item {
    margin-left: 5px;
    cursor: pointer;
}
.price-contain {
    display: flex;
    height: 60px;
}
</style>

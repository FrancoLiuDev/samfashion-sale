<template>
    <div>
        <div v-show="true">
            <div>
                <div id="delivery-header" class="header">
                    <span class="cell-product">訂購人資訊</span>
                </div>
            </div>
            <div class="list-content" id="order-submit">
                <div class="cell-list-item">
                    <span class="cell-title">業務:</span>
                    <b-form-input v-model="orderInfo.saleMember" class="input-field" type="text" size="sm" placeholder="業務"></b-form-input>
                </div>
                <div class="cell-list-item">
                    <span class="cell-title">手機:</span>
                    <b-form-input v-model="orderInfo.orderPhone" class="input-field" type="text" size="sm" placeholder="手機"></b-form-input>
                </div>
                <div class="cell-list-item">
                    <span class="cell-title">地址:</span>
                    <b-form-input v-model="orderInfo.orderAddr" class="input-field" type="text" size="sm" placeholder="地址"></b-form-input>
                </div>
                <div class="cell-list-item">
                    <span class="cell-title">價格:</span>
                    <div class="price-contain">
                        <div class="price-items" v-for="(item,index) in orderInfo.orderPrice" :key="index">
                            {{index}}:{{item}}
                            <div class="del-item" v-on:click="onRemocePrice(index)">X</div>
                        </div>
                        <div>
                            <b-form-input v-model="valAddPrice" class="input-field" type="text" size="sm" placeholder="價格"></b-form-input>
                        </div>
                        <b-button size="sm" id="bt-addprice" v-on:click="onAddPrice">
                            +
                        </b-button>
                    </div>
                </div>
                <div class="cell-list-item">
                    <span class="cell-title">備註:</span>
                    <b-form-input v-model="orderInfo.orderOther" class="input-field" type="text" size="sm" placeholder="備註"></b-form-input>
                </div>
                <b-button size="sm" v-on:click="onSubmitNewOrder">
                    提交
                </b-button>
            </div>
        </div>
        <div id="command-layout">
            <span class="cell-title">搜索:</span>
            <b-form-input v-model="textSearch" class="input-field" type="text" size="sm" placeholder="流水號 0505001"></b-form-input>
            <b-button size="sm" class="mr-2" v-on:click="fetchListData">
                   搜索
                </b-button>
        </div>
        <b-table striped hover :items="items" :fields="fields">
            <template slot="action" slot-scope="row">
                <!-- we use @click.stop here to prevent emitting of a 'row-clicked' event  -->
                <b-button size="sm" class="mr-2" v-on:click="onDelOrder(row.item)">
                    刪除
                </b-button>
            </template>
            <template slot="orderInfo" slot-scope="row">
                {{row.item.orderPhone}}<br> {{row.item.orderAddr}}

            </template>
            <template slot="price" slot-scope="row">
                <div v-for="(dspprice,index) in row.item.orderPrice" :key="index">
                    <span>${{dspprice}}</span><br>
                </div>
            </template>
        </b-table>
    </div>
</template>

<script>
import interactor from './interactor.js'
import columns from '@Mixins/fuctional/columns'
import msRequest from '@Requests/msserver/msOrder'
import OrderInfo from '@Models/OrderInfo'
import OrderIiemInfo from '@Models/OrderIiemInfo'
export default {
    mixins: [interactor, columns],
    data() {
        return {
            fields: [
                { key: 'orderDateNumber', label: '流水號' },
                { key: 'saleMember', label: '業務' },
                { key: 'dateDisplay', label: '日期' },
                { key: 'price', label: '價格' },
                { key: 'orderInfo', label: '電話/地址' },
                { key: 'orderOther', label: '備註' },
                { key: 'action', label: '刪除' }
            ],
            items: [],
            valAddPrice: '',
            orderInfo: new OrderInfo(),
            testprice: [22, 11],
            textSearch: ''
        }
    },
    components: {},
    watch: {
        'orderInfo.saleMember': function(newVal) {
            console.log(newVal)
        }
    },
    mounted() {
        this.fetchListData()
    },
    methods: {
        onPack(item) {
            console.log('item', item)
            this.$router.push({ name: 'productDetail', query: { key: item.row.primaryKey } })
        },
        onAddPrice() {
            console.log('onAddPrice')
            this.orderInfo.orderPrice.push(this.valAddPrice)
        },
        onRemocePrice(index) {
            this.orderInfo.orderPrice.splice(index, 1)
        },
        onSubmitNewOrder() {
            msRequest.createMsOrder(this.orderInfo.packNewData()).then(result => {
                if (result.data.success == true) {
                    console.log('result', result)
                    this.orderInfo.clear()
                    this.valAddPrice = ''
                    this.fetchListData()
                }
            })
        },
        onDelOrder(item) {
            console.log('delete item', item)
            msRequest.deleteMsOrder(item._orderId).then(result => {
                if (result.data.success == true) {
                    console.log('result', result)
                    this.orderInfo.clear()
                    this.valAddPrice = ''
                    this.fetchListData()
                }
            })
        },
        fetchListData() {
            var lenth =this.textSearch.length
            var condiition = {}
            while(true){
                if (lenth == 0) break
                if (lenth >=2){
                    var sMonth = parseInt(this.textSearch.substring(0, 2))
                    if  (sMonth > 0 && sMonth < 13) condiition['month'] = sMonth
                }
                if (lenth >=4){
                    var sDate = parseInt(this.textSearch.substring(2, 4))
                    if  (sDate > 0 && sDate < 32) condiition['date'] = sDate
                }
                 if (lenth >=7){
                    var sOrder = parseInt(this.textSearch.substring(4, 7))
                    if  (sOrder > 0 && sOrder < 1000) condiition['order'] = sOrder
                }
                break
            }
            console.log('condiition',condiition)
            
            msRequest
                .listMsOrders(condiition)
                .then(result => {
                    var self = this
                    this.items = []
                    result.data.data.forEach(function(item) {
                        var ObjItem = new OrderIiemInfo()
                        ObjItem.load(item)
                        self.items.push(ObjItem)
                    })
                })
        }
    }
}
</script>

<style lang="less"scoped>
#command-layout {
    width: auto;
}
#order-submit {
    margin-bottom: 20px;
}
#bt-addprice {
    height: 30px;
    margin-left: 5px;
}
.cell-list-item {
    margin-bottom: 5px;
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

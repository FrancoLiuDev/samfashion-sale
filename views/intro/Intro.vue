<template>
    <div>
        <div>
            <div id="delivery-header" class="header">
                <span class="cell-product">訂購人資訊</span>
            </div>
        </div>
        <div class="list-content"  id="order-submit">
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
                        <b-form-input v-model="valAddPrice" class="input-field" type="text" size="sm" placeholder="備註"></b-form-input>
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
        <b-table striped hover :items="items" :fields="fields">
            <template slot="action" slot-scope="row">
                <!-- we use @click.stop here to prevent emitting of a 'row-clicked' event  -->
                <b-button size="sm" class="mr-2">
                     刪除
                </b-button>

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
        // orderId: 97,
        //   ownerId: 1,
        //   createDate: '2018-05-31T10:31:26.000Z',
        //   orderDateNumber: 11,
        //   saleMember: 11,
        //   orderPhone: '11',
        //   orderAddr: '11',
        //   orderSpec: 'updata.orderSpec',
        //   orderPrice: '11',
        //   orderOther: '11' },
        return {
            fields: [
                { key: 'orderDateNumber', label: '流水號' },
                { key: 'saleMember', label: '業務' },
                { key: 'dateDisplay', label: '日期' },
                { key: 'price', label: '價格' },
                { key: 'orderAddr', label: '地址' },
                { key: 'orderOther', label: '備註' },
                 { key: 'action', label: '刪除' },
             
                
            ],
            items: [],
            valAddPrice: '',
            orderInfo: new OrderInfo(),
            testprice:[22,11]
        }
    },
    components: {},
    watch: {
        'orderInfo.saleMember': function(newVal) {
            console.log(newVal)
        }
    },
    mounted() {
        console.log('mounted')
        //msRequest.createMsOrder({})
        msRequest.listMsOrders().then(result => {
            var self = this
            this.items = []

            result.data.data.forEach(function(item) {
                var ObjItem = new OrderIiemInfo()
                ObjItem.load(item)

                self.items.push(ObjItem)
            })
        })
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
            msRequest.createMsOrder(this.orderInfo.packNewData())
        }
    }
}
</script>

<style lang="less"scoped>
#order-submit{
    margin-bottom: 20px;
    
}
#bt-addprice {
    height: 30px;
    margin-left: 5px;
}
.cell-list-item{
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

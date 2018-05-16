import Vue from 'vue'
import VueFactory from 'vue-factory'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import { Button, Table } from 'iview'
Vue.component('Button', Button)
Vue.component('Table', Table)

Vue.use(iView)
console.log('pugin VueFactory')
Vue.use(VueFactory)

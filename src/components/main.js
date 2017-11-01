import App from './App.vue';
import Vue from 'vue';
import axios from 'axios';
import Vuex from 'vuex';
import login from "./admin/account/login.vue";
import layout from './admin/layout.vue';
import goodlist from "./admin/goods/goodlist.vue";
import goodinfo from "./admin/goods/goodinfo.vue";
import cart from "./admin/goods/cart.vue";
import shop from "./admin/goods/shop.vue";
import pay from "./admin/goods/pay.vue";
import payed from "./admin/goods/payed.vue";
import orderdetail from "./admin/goods/orderdetail.vue";
import paysuccess from "./admin/goods/paysuccess.vue";
import vipcenter from "./admin/goods/vipcenter.vue";
import orderlist from "./admin/goods/orderlist.vue";
import Element from "element-ui";
import iView from 'iview';
Vue.use(iView);

var vm=new Vue({});
window.vm=vm;
import '../../statics/site/css/style.css'
import '../../statics/elementuiCss/index.css'

import VueQRCodeComponent from 'vue-qrcode-component'
Vue.component('qr-code', VueQRCodeComponent)
//设置axios
axios.defaults.baseURL = 'http://157.122.54.189:9095';
axios.defaults.withCredentials=true;
//全局应用就要将axios对象挂载到vue的原型属性$http上
Vue.prototype.$http = axios;
// 设置路由
import vueRouter from 'vue-router';
//配置路由
var routes = [{
    name: 'default',
    path: '/',
    redirect: '/site'
},  {
    name: 'site',
    path: '/site',
    component: layout,
    children: [{
        name: 'goodlist',
        path: 'goodlist',
        component: goodlist,
    },
        {
            name: 'goodinfo',
            path: 'goodinfo/:infoid',
            component: goodinfo,
        },
        {
            name: 'cart',
            path: 'cart',
            component: cart,

        },
        {
            name: 'login',
            path: 'login',
            component: login,
        },
        {
            name: 'shop',
            path: 'shop/:ids',
            component: shop,
            meta:{isLogined:true}
        },
        {
            name: 'pay',
            path: 'pay/:orderid',
            component: pay,
            meta:{isLogined:true}
        },
        {
            name: 'payed',
            path: 'payed',
            component: payed,

        },
        {
            name: 'paysuccess',
            path: 'paysuccess/:orderid',
            component: paysuccess,
            meta:{isLogined:true}
        },
        {
            name: 'vipcenter',
            path: 'vipcenter',
            component: vipcenter,
            meta:{isLogined:true}
        },
        {
            name: 'orderlist',
            path: 'orderlist',
            component: orderlist,
            meta:{isLogined:true}
        },
        {
            name: 'orderdetail',
            path: 'orderdetail/:orderdetailId',
            component: orderdetail,
            meta:{isLogined:true}
        },

    ]
}];
const router = new vueRouter({ routes });
Vue.use(vueRouter);
Vue.use(Element);
Vue.use(axios);
Vue.use(Vuex);
//设置store，
const state={
    cateItem:0
};
const mutations={
    changeCateItem(state,num){
          state.cateItem+=num;
    }
};
const actions={
    changeCateItem({commit},num){commit('changeCateItem',num)}
};
const getters={};
const store=new Vuex.Store({
     state,mutations,actions,getters
})
//绑定到vue上。


//配置store.

var vm=new Vue({
    el: "#app",
    router: router,
    store,
    render: h => h(App)
})



//全局拦截
router.beforeEach((to,from,next)=>{
    //首先要存要去的地址到localStorage去。但是登录页面不用存。
    if(to.name!='login'){
        localStorage.setItem('topath',to.name);
    }
    //如果去到结算页面，就要先先检查有没有登录过。
    if(to.meta.isLogined){
        axios.get('/site/account/islogin').then(res=>{
            if(res.data.code=='logined'){
                next();
            }else{
                router.push({name:'login'});
                next();
            }
        })
    }else{
        next();
    }

})



Vue.filter('datefmt',(input,fmtstring)=>{
    var mydate = new Date(input);
    var y = mydate.getFullYear();
    var m = mydate.getMonth() + 1;
    var d = mydate.getDate();
    var h = mydate.getHours();
    var mi = mydate.getMinutes();
    var s = mydate.getSeconds();

    if(fmtstring == 'YYYY-MM-DD'){
        return y + '-' + m + '-' + d;
    }
    if(fmtstring == 'YYYY-MM-DD HH:mm:ss'){
        return y + '-' + m + '-' + d + ' ' + h + ':'+ mi + ':' + s;
    }

});

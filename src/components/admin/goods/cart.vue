<template>
   <div>
       <div class="section">
           <div class="location">
               <span>当前位置：</span>
               <a href="/index.html">首页</a> &gt;
               <a href="/cart.html">购物车</a>
           </div>
       </div>

       <div class="section">
           <div class="wrapper">
               <div class="bg-wrap">
                   <!--购物车头部-->
                   <div class="cart-head clearfix">
                       <h2><i class="iconfont icon-cart"></i>我的购物车</h2>
                       <div class="cart-setp">
                           <ul>
                               <li class="first active">
                                   <div class="progress">
                                       <span>1</span>
                                       放进购物车
                                   </div>
                               </li>
                               <li>
                                   <div class="progress">
                                       <span>2</span>
                                       填写订单信息
                                   </div>
                               </li>
                               <li class="last">
                                   <div class="progress">
                                       <span>3</span>
                                       支付/确认订单
                                   </div>
                               </li>
                           </ul>
                       </div>
                   </div>
                   <!--购物车头部-->
                   <!--商品列表-->
                   <div class="cart-box">
                       <input id="jsondata" name="jsondata" type="hidden">
                       <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                           <tbody>
                           <tr>
                               <th width="48" align="center">
                                   <el-button type="success" @click="isSelectAll">{{values}}{{text}}</el-button>
                               </th>
                               <th align="left" colspan="2">商品信息</th>
                               <th width="84" align="left">单价</th>
                               <th width="104" align="center">数量</th>
                               <th width="104" align="left">金额(元)</th>
                               <th width="54" align="center">操作</th>
                           </tr>
                           <tr  v-if="shoplist.length<=0">
                               <td colspan="10">
                                   <div class="msg-tips">
                                       <div class="icon warning"><i class="iconfont icon-tip"></i></div>
                                       <div class="info">
                                           <strong>购物车没有商品！</strong>
                                           <p>您的购物车为空，<a href="/index.html">马上去购物</a>吧！</p>
                                       </div>
                                   </div>
                               </td>
                           </tr>
                           <tr v-for="(item,index) in shoplist">
                               <td width="48" align="center">
                                   <el-switch
                                           @change="changeValue"
                                           v-model="values[index]"
                                           on-text="已选"
                                           off-text="未选">
                                   </el-switch>
                               </td>
                               <td align="left" colspan="2"><img :src="item.img_url" alt="" width="40">{{item.title}}</td>
                               <td width="84" align="left">{{item.sell_price}}</td>
                               <td width="104" align="center"><myinput @sontofa='fromson' :options="{gid:item.id,gcount:item.buycount}"></myinput></td>
                               <td width="104" align="left">{{item.sell_price*item.buycount}}(元)</td>
                               <td width="54" align="center"><el-button type="success" @click="del(item.id)">删除</el-button></td>
                           </tr>
                           <tr>
                               <th align="right" colspan="8">
                                   已选择商品 <b class="red" id="totalQuantity">{{gettrueArr}}</b> 件 &nbsp;&nbsp;&nbsp;
                                   商品总金额（不含运费）：<span class="red">￥</span><b class="red" id="totalAmount">{{getTotal}}</b>元
                               </th>

                           </tr>
                           </tbody></table>
                   </div>
                   <!--/商品列表-->
                   <!--购物车底部-->
                   <div class="cart-foot clearfix">
                       <div class="right-box">
                           <button class="button" >继续购物</button>
                           <button class="submit" @click="getbil">立即结算</button>
                       </div>
                   </div>
                   <!--购物车底部-->
               </div>
           </div>
       </div>
   </div>

</template>
<script>
    import {getItem,setItem,delItem} from '../../kits/localStorage.js';
    import myinput from '../../subcomponents/myinput.vue';


    export  default {
        data(){
           return  {shoplist:[],quantity:0,
               values:[false,false],text:'全选',
               selectall:false,total:0,gooditem:{}}
        },
        components:{myinput},
        watch:{
            'values':function (newValue) {

            }
        },
        //每次都给了一个重新的值。再template里用{{}}调用。
        computed:{
            getTotal(){
          var trueArr=this.values.filter(item=>{
                   return  item==true
                })

                var totalprice=0;
             trueArr.forEach((item,index)=>{
                 if(item){
                     totalprice+=this.shoplist[index].buycount*this.shoplist[index].sell_price
                 }
             });
             return totalprice;
            },
            gettrueArr(){
                var trueArr=this.values.filter(item=>{
                    return  item==true
                })
                return trueArr.length;
            }
        },
        methods:{
            //账单。
            getbil(){
                var ids=[];

                this.values.forEach((item,index)=>{
                    if(item){
                        ids.push(this.shoplist[index].id);
                    }
                });
               ids=ids.join(',');
                console.log(ids);
                if(ids.length==0){
                    this.$message.error('请选择要购买的商品');
                    return;
                }
                this.$router.push({name:'shop',params:{ids:ids}});
            },
            //渲染列表
            getShoplist(){
                var shoplists= getItem();
                var arr=[];
                for(var key in shoplists){
                    arr.push(key);
                }
                var str=arr.join(',');
                var url='/site/comment/getshopcargoods/'+str;
                this.$http.get(url).then(res=>{
                   this.shoplist=res.data.message;
                    var goodsbrief=getItem('key');
                    //通过id找到对应的buycount。
                    for(var i=0;i<this.shoplist.length;i++){
                        for(var key in goodsbrief){
                            if(this.shoplist[i].id==key){

                                this.shoplist[i].buycount=goodsbrief[key];
                            }
                        }
                    }
                });

            },
            //全选和反选逻辑
            isSelectAll(){
                this.selectall=!this.selectall;

                if(this.selectall){
                    this.text = '反选';
                }else{
                    this.text = '全选';
                }
               for(var i=0;i<this.values.length;i++){
//                   this.values[i]=this.selectall;
//               this.values.splice(i, 1, this.selectall);
               this.$set(this.values,i,this.selectall)
               }
               //因为是数组，所以要加上这个。
//                this.values.push(true);
//                this.values.pop();
               },
            changeValue(val){

            },
            getItems(){
                this.gooditem= getItem();
            },
            fromson(val){
                console.log(val);
                this.shoplist.forEach(item=>{
                    if(item.id == val.id){
                        item.buycount = val.count;
                    }
                });
                this.shoplist.push('');
                this.shoplist.pop();
            },
            del(id){
                var indexs=-1;
                this.shoplist.forEach((item,index)=>{
                    if(item.id=id){
                        indexs=index;
                    }
                });
                this.shoplist.splice(indexs,1);
//                更新values
                this.values.splice(indexs,1);
//                更新localStorage
                delItem(id);

            }
        },

        created(){
            this.getShoplist();
            this.getItems();
        }
    }

</script>
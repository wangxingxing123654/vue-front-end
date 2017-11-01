<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>

        <div  class="section">
            <div  class="wrapper">
                <div  class="bg-wrap">
                    <div  class="nav-tit pay">
                        <a  href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div  class="form-box payment">
                        <div  class="el-row">
                            <div  class="el-col el-col-16">
                                <div  class="el-row">
                                    <div  class="el-col el-col-12">
                                        <dl  class="form-group">
                                            <dt >订 单 号：</dt>
                                            <dd >{{orderlist.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div  class="el-col el-col-12">
                                        <dl  class="form-group">
                                            <dt >收货人姓名：</dt>
                                            <dd >{{orderlist.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div  class="el-row">
                                    <div  class="el-col el-col-12">
                                        <dl  class="form-group">
                                            <dt >送货地址：</dt>
                                            <dd >{{orderlist.area}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div  class="el-col el-col-12">
                                        <dl  class="form-group">
                                            <dt >手机号码：</dt>
                                            <dd >{{orderlist.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div  class="el-row">
                                    <div  class="el-col el-col-12">
                                        <dl  class="form-group">
                                            <dt >支付金额：</dt>
                                            <dd >{{orderlist.order_amount}}元</dd>
                                        </dl>
                                    </div>
                                    <div  class="el-col el-col-12">
                                        <dl  class="form-group">
                                            <dt >支付方式：</dt>
                                            <dd >在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div  class="message">
                                    <span >备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
                                    <span >{{orderlist.message}}</span>
                                </div>
                            </div>
                            <div  class="el-col el-col-8">
                                <div  id="container">
                                    <qr-code :text=url></qr-code>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>
<script>



    export  default {
        data(){
           return { orderlist:{},url:"http://157.122.54.189:9095/site/validate/order/pay/"+this.$route.params.orderid,
               timerId:null,
           }
        },

        created(){this.getOrderlist()},
        mounted(){
         this.timerId=setInterval(this.checkPayed,5000);
        },
        destroyed(){
            //要进行判断要不然会一直发送请求。
           if(this.timerId){
               clearInterval(this.timerId);
           }
        },
        methods:{
            checkPayed(){
                this.$http.get('/site/validate/order/getorder/'+this.$route.params.orderid)
                    .then(res=>{
                        if(res.data.message[0].status==2){
                            this.$router.push({name:'payed'})
                        }
                    })
            },
          getOrderlist(){
              this.$http.get('/site/validate/order/getorder/'+this.$route.params.orderid)
                  .then(res=>{
                      this.orderlist=res.data.message[0];

                  })
          },

        }
    }
</script>
<template>
    <div>
        <el-button type="success" @click="pay">
                      支付
        </el-button>

    </div>
</template>
<script>
    export default {
        data(){
            return{}
        },
        methods:{
            pay(){
                this.$http.get('/site/validate/order/pay/'+this.$route.params.orderid)
                    .then(res=>{
                        //跳到会员中心。
                        console.log(res);
                        if(res.data.status==0){
                            this.$message.success('支付成功');


                        }
                    })
            },
        }
    }
</script>
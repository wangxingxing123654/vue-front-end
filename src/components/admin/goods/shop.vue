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
                                <li class="active">
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
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <div class="form-box address-info">
                                <input type="hidden" v-model="ruleForm.goodsids">
                                <input type="hidden" v-model="ruleForm.cargoodsobj">
                                <el-row>
                                    <el-col :span="12"><el-form-item label="收件人" prop="accept_name">
                                        <el-input v-model="ruleForm.accept_name"></el-input>
                                    </el-form-item></el-col>
                                </el-row>
                                <el-form-item label="所属地区" prop="area">
                                    <v-distpicker v-model="ruleForm.area"  @selected="onSelected"></v-distpicker>
                                </el-form-item>
                                <el-form-item label="详细地址" prop="address">
                                    <el-input v-model="ruleForm.address"></el-input>
                                </el-form-item>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="手机号码" prop="mobile">
                                            <el-input v-model="ruleForm.mobile"></el-input>
                                        </el-form-item>
                                    </el-col>

                                </el-row>
                                <el-row>
                                    <el-col :span="12">
                                        <el-form-item label="电子邮箱" prop="email">
                                            <el-input v-model="ruleForm.email"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="邮政编码" prop="post_code">
                                            <el-input v-model="ruleForm.post_code"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </div>
                            <h2 class="slide-tit">
                                <span v-model="ruleForm.payment_id">2、支付方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <el-radio class="radio" v-model="ruleForm.payment_id" label="6">在线支付</el-radio>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span >3、配送方式</span>
                            </h2>
                                <!--取得一个DataTable-->
                            <el-radio-group v-model="ruleForm.express_id"  class="item-box clearfix" @change="getRadio">
                                <el-radio :label="item.id" v-for="item in expressinfo" :key="item.id" >{{item.title}} 费用：{{item.express_fee}}元</el-radio>
                            </el-radio-group>
                            <h2 class="slide-tit">
                                <span>4、商品清单</span>
                            </h2>
                            <div class="line15"></div>
                            <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                <tbody><tr>
                                    <th colspan="2" align="left">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="84" align="center">购买数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                </tr>
                                <tr v-for="item in goodsinfo">
                                    <td width="68">
                                        <router-link v-bind="{to:'/site/goodinfo/'+item.id}">
                                            <img :src="item.img_url" class="img">
                                        </router-link>
                                    </td>
                                    <td>
                                        <router-link v-bind="{to:'/site/goodinfo/'+item.id}">
                                        {{item.title}}
                                        </router-link>
                                    </td>
                                    <td>
                                        <span class="red">
                                        ￥{{item.sell_price}}
                                        </span>
                                    </td>
                                    <td align="center">{{item.buycount}}</td>
                                    <td>
                                        <span class="red">
                                        ￥{{item.sell_price*item.buycount}}
                                        </span>
                                    </td>
                                </tr>
                                </tbody></table>
                            <div class="line15"></div>
                            <h2 class="slide-tit">
                                <span>5、结算信息</span>
                            </h2>
                            <div class="buy-foot clearfix">
                                <div class="left-box">
                                    <dl>
                                        <dt>订单备注(100字符以内)</dt>
                                        <dd>
                                            <textarea name="message" class="input" style="height:35px;" v-model="ruleForm.message"></textarea>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="right-box">
                                    <p>
                                        商品 <label class="price">{{total}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp;
                                        商品金额：￥<label id="goodsAmount" class="price">{{totalBil}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p>
                                        运费：￥<label id="expressFee" class="price">{{ruleForm.expressMoment}}</label> 元
                                    </p>
                                    <p class="txt-box">
                                        应付总金额：￥<label id="totalAmount" class="price">{{getTotalBil}}</label>
                                    </p>
                                    <p class="btn-box">
                                        <a class="btn button" href="/cart.html">返回购物车</a>
                                        <input id="btnSubmit" name="btnSubmit" type="button" value="确认提交" class="btn submit" @click="submitform">
                                    </p>
                                </div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
    import VDistpicker from 'v-distpicker';
    import {getItem,setItem} from '../../kits/localStorage.js';
    export default {
        data() {
            //手机号码验证
            var reg=/^13[0-9]{9}|15[012356789][0-9]{8}|18[0256789][0-9]{8}|147[0-9]{8}$ /
            var checkMobile = (rule, value, callback) => {
                    if (!value) {
                        return callback(new Error('手机号码不能为空'));
                    } ;
                    if (!reg.test(value)) {
                    callback(new Error('请输入正确的手机号码'));
                }
                callback();
            };
            //邮箱验证
            var reg1=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
            var checkEmail = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('邮箱不能为空'));
                } ;
                if (!reg1.test(value)) {
                    callback(new Error('请输入正确的邮箱号码'));
                }
                callback();
            };
            //验证邮政编码
            var reg2=/^\d{6}$/;
            var checkCode=(rule, value, callback) => {
                if (!value) {
                    return callback(new Error('邮箱不能为空'));
                } ;
                if (!reg2.test(value)) {
                    callback(new Error('请输入正确的邮箱号码'));
                };
                callback();
            };
            return {
                total:0,
                totalBil:0,
                expressinfo:[],
                goodsinfo:[],
                ruleForm: {
                    "goodsAmount":0,
                    "expressMoment":20,
                    "accept_name":"",
                    "area":{
                    },
                    "address":"",
                    "mobile":"",
                    "email":"",
                    "post_code":"",
                    "payment_id":-1,
                    "express_id":1,
                    "message":"",
                    "goodsids":"",
                    "cargoodsobj":{}
                }
                ,
                rules: {

                    accept_name: [
                        { required: true, message: '请输入收件人姓名', trigger: 'blur' },
                    ],
                    area: [
                        { required: true, message: '请选择所属地区', trigger: 'change' }
                    ],
                    address: [
                        { required: true, message: '请输入详细地址', trigger: 'blur' }
                    ],
                    mobile: [
                        { validator:checkMobile, trigger: 'blur' }
                    ],
                    post_code: [
                        { validator:checkCode, trigger: 'blur' }
                    ],
                    email: [
                        { validator:checkEmail, trigger: 'blur' }
                    ],

                }
            };
        },
        //计算属性。动态检查总金额
        computed:{
            getTotalBil(){
                return this.totalBil+this.ruleForm.expressMoment;
            }
        },
        components: { VDistpicker },
        methods: {
            //三级联动
            onSelected(data) {
               this.ruleForm.area=data;
            },
            //提交表单
            submitform(){
                this.$http.post('/site/validate/order/setorder',this.ruleForm)
                    .then(res=>{
                        console.log(res);
                        this.$message.success(res.statusText);
                        this.$router.push({name:'pay',params:{orderid:res.data.message.orderid}})
                    })
            },
            //算出总金额
            getTotal(){
                for(var i=0;i<this.goodsinfo.length;i++){
                    this.totalBil+=this.goodsinfo[i].buycount*this.goodsinfo[i].sell_price;
                };

            },
            //单选框改变。
            getRadio(val){
                this.expressinfo.forEach(item=>{
                    if(item.id==val){
                         this.ruleForm.expressMoment=item.express_fee
                    }
                })
            },
            //获取商品清单
            getgoodslist(){
                var ids=this.$route.params.ids;
                this.ruleForm.goodsids=ids;
                this.$http.get('/site/validate/order/getgoodslist/'+ids).then(res=>{
                    this.goodsinfo=res.data.message;
                    //从localStorage取出商品的个数。
                   var datainfo=getItem();
                    this.ruleForm.cargoodsobj=datainfo;
                   for(var i=0;i<this.goodsinfo.length;i++){
                        this.goodsinfo[i].buycount=datainfo[this.goodsinfo[i].id];
                   };
                 this.total= ids.split(',').length;
                    this.getTotal();
                });

            },
            //获取快递方式。
            getExpress(){
                this.$http.get('/site/validate/order/getexpresslist').then(res=>{
                    if(res.data.status==0){
                        this.expressinfo=res.data.message;
                    }
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        created(){
            this.getExpress();
            this.getgoodslist();

        }
    }
</script>
<template>

    <div>
        <!-- 导航栏 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a>&gt;
                <a href="/goods/42/1.html">商品详情</a>

            </div>
        </div>

        <!-- 商品详情 -->
        <div class="section" v-if="datalist.goodsinfo">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <!--页面左边-->
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!--商品图片-->
                            <div class="pic-box">
                                <div class="magnifier" id="magnifier1">
                                    <div class="magnifier-container">
                                        <div class="images-cover"></div>
                                        <!--当前图片显示容器-->

                                        <div class="move-view">
                                            <img src="../../../../statics/site/js/jqplugins/imgzoom/images/move-box.png" alt="">
                                        </div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li v-for="item in datalist.imglist" :key="item.id">
                                                    <div class="small-img">
                                                        <img :src="item.original_path" />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view">

                                    </div>
                                    <!--经过放大的图片显示容器-->
                                </div>

                            </div>
                            <!--/商品图片-->

                            <!--商品信息-->
                            <div class="goods-spec" >
                                <h1>{{datalist.goodsinfo.title}}</h1>
                                <p class="subtitle">{{datalist.goodsinfo.zhaiyao}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{datalist.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{datalist.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em class="price" id="commoditySellPrice">¥{{datalist.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>

                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
                                            </div>
                                                <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{datalist.goodsinfo.stock_quantity}}</em>件
                                                </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div class="btn-buy" id="buyButton">
                                                <router-link to="/site/cart">
                                                <button class="buy" >立即购买</button>
                                                </router-link>
                                                <button class="add" @click="addToCart">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>

                            </div>
                            <!--/商品信息-->
                        </div>

                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <!--选项卡-->
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <Affix>
                                    <ul>
                                        <li>
                                            <a  href="javascript:;"  @click="changeActive(true)" v-bind="{class:isActive==true?'selected':''}">商品介绍</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" @click="changeActive(false)" v-bind="{class:isActive==false?'selected':''}">商品评论</a>
                                        </li>
                                    </ul>
                                </Affix>

                            </div>
                            <!--/选项卡-->

                            <!--选项内容-->
                            <div class=" entry" v-if="isActive">
                                <span v-html="datalist.goodsinfo.content"></span>
                            </div>

                            <div class="" v-if="!isActive">
                                <!--网友评论-->
                                <div class="comment-box">
                                    <!--取得评论总数-->
                                    <form id="commentForm" name="commentForm" class="form-box" url="/tools/submit_ajax.ashx?action=comment_add&amp;channel_id=2&amp;article_id=98">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！" v-model="commenttxt"></textarea>
                                                <span class="Validform_checktip"></span></div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="button" value="提交评论" class="submit" @click="commit">
                                                <span class="Validform_checktip"></span></div>
                                        </div>
                                    </form>
                                    <ul id="commentList" class="list-box">
                                        <p v-if='commentList.length<=0' style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in commentList">
                                            <div class="avatar-box"><i class="iconfont icon-user-full"></i></div>
                                            <div class="inner-box"><div class="info">
                                                <span>{{item.user_name}}</span>
                                            <span>{{item.add_time|datefmt('YYYY-MM-DD HH:mm:ss')}}</span>
                                            </div>
                                                <p v-text="item.content"></p>
                                            </div>
                                        </li>

                                    </ul>
                                    <!--放置页码-->
                                    <div class="page-box" style="margin:5px 0 0 62px">
                                        <el-pagination
                                                @size-change="handleSizeChange"
                                                @current-change="handleCurrentChange"
                                                :current-page="pageIndex"
                                                :page-sizes="[10, 20, 30, 40]"
                                                :page-size="pageSize"
                                                layout="total, sizes, prev, pager, next, jumper"
                                                :total="totalcount">
                                        </el-pagination>
                                    </div>
                                    <!--/放置页码-->
                                </div>

                                <!--/网友评论-->
                            </div>

                        </div>

                    </div>
                    <!--/页面左边-->

                    <!--页面右边-->
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="hot in datalist.hotgoodslist">
                                        <div class="img-box">
                                            <a href="/goods/show-98.html">
                                                <img :src="hot.img_url">
                                            </a>
                                        </div>
                                        <div class="txt-box">
                                            <a href="/goods/show-98.html">{{hot.title}}</a>
                                            <span>{{hot.add_time|datefmt('YYYY-MM-DD')}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!--/页面右边-->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import '../../../../statics/site/js/jqplugins/imgzoom/magnifier.js';
    import {setItem,getItem} from '../../kits/localStorage.js';
    import Affix from 'iview/src/components/affix';
    export default {

        data() {
            return {
                    datalist:{},
                    isActive:true,
                    pageSize:10,
                    pageIndex:1,
                    totalcount:0,
                    commentList:[],
                    commenttxt:'',
                      num1:1,
                      goodItem:{}
            }


        },
        components:{Affix},
        watch:{
            // 当url的参数的发生改变的时候，会触发这个watch的重新执行
            '$route':function(){
                // 当触发了这个方法就重新获取到最新的数据
                this.getinfo();
            }
        },
        created(){this.getinfo();this.getcomment();},
        methods: {
            changeActive(bol){this.isActive=bol},
            getinfo(){
                var url = "/site/goods/getgoodsinfo/"+this.$route.params.infoid;
                this.$http.get(url).then(res => {
                    this.datalist=res.data.message;

              setTimeout(function () {
                  $('#magnifier1').imgzoon({magnifier:'#magnifier1'});
              },100)

            });
            },
            getcomment(){
                var url = "/site/comment/getbypage/goods/"+this.$route.params.infoid+
                        "?pageIndex="+this.pageIndex+"&pageSize="+this.pageSize;
                this.$http.get(url).then(res => {
                    this.commentList=res.data.message;
                    this.totalcount=res.data.totalcount;
            });
            },
            commit(){
                // /site/validate/comment/post/:tablename/:artid
                var url='/site/validate/comment/post/goods/'+this.$route.params.infoid;
                this.$http.post(url,{'commenttxt':this.commenttxt}).then(res => {
                     if(res.data.status==1){
                     this.$message(res.data.message);return;
                }
                this.$message(res.data.message);
                this.commenttxt='';
                this.getcomment();
            });
            },
            handleSizeChange(val){
               this.pageSize=val;
                this.getcomment();
            },
            handleCurrentChange(val){
                this.pageIndex=val;
                this.getcomment();
            },
            handleChange(value) {
                console.log(value);
            },
            addToCart(){
                this.$store.dispatch('changeCateItem',this.num1);
                //只是改变了数量，没有存储数据。所以要把对应要买的id和数据存贮起来。{gid:id,gAmount:this.num1}
                var id=this.$route.params.infoid;
                var amount=this.num1;
                var goodsinfo={gid:id,amount:amount};

                //但是在localStorage要进行判断，如果有这个id对应的商品，则加一个就行了。如果没有，推一个进去。
                //localStorage存储的格式是{id:this.num1}.
               setItem(goodsinfo);
            },

    }}
</script>
<style>
    @import url('../../../../statics/site/js/jqplugins/imgzoom/css/magnifier.css');
</style>
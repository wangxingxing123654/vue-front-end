<template>
      <div>
          <div class="section">
              <div class="wrapper">
                  <div class="wrap-box">
                      <!--类别菜单-->
                      <div class="left-220" style="margin:0;">
                          <div class="banner-nav">
                              <ul>
                                  <!--此处声明下面可重复循环-->

                                  <li v-for="item in datalist.catelist">
                                      <h3>
                                          <i class="iconfont icon-arrow-right"></i>
                                          <span>{{item.title}}</span>
                                          <p>
                                              <span v-for="subitem in item.subcates">{{subitem.title}}&nbsp;&nbsp;</span>
                                          </p>
                                      </h3>
                                      <div class="item-box">
                                          <!--如有三级分类，此处可循环-->
                                          <dl>
                                              <dt><a href="/goods/40.html">{{item.title}}</a></dt>
                                              <dd>
                                                  <a href="/goods/43.html" v-for="subitem in item.subcates">{{subitem.title}}&nbsp;&nbsp;</a>
                                              </dd>
                                          </dl>
                                      </div>
                                  </li>
                              </ul>
                          </div>
                      </div>
                      <!--/类别菜单-->

                      <!--幻灯片-->
                      <div class="left-705">
                          <el-carousel :interval="5000" arrow="always">
                              <el-carousel-item v-for="item in datalist.sliderlist" :key="item.id">

                                  <img :src="item.img_url" alt="" width="705" height="300" >
                                  <h3>{{ item.title }}</h3>
                              </el-carousel-item>
                          </el-carousel>
                      </div>
                      <!--/幻灯片-->

                      <!--推荐商品-->
                      <div class="left-220">
                          <ul class="side-img-list">
                              <li v-for="(item,index) in datalist.toplist">
                                  <div class="img-box">
                                      <label>{{index+1}}</label>
                                      <img :src='item.img_url'>
                                  </div>
                                  <div class="txt-box">
                                      <a href="/goods/show-98.html">{{item.title}}</a>
                                      <span>{{item.add_time|datefmt('YYYY-MM-DD')}}</span>
                                  </div>
                              </li>
                          </ul>
                      </div>
                      <!--/推荐商品-->
                  </div>
              </div>
          </div>
          <div class="section" v-for="item in category">

              <!--子类-->
              <div class="main-tit" >
                  <h2>{{item.catetitle}}</h2>
                  <p>
                      <a href="/goods/43.html" v-for="bigcate in item.level2catelist">{{bigcate.subcatetitle}}</a>
                      <a href="/goods/40.html">更多
                          <i>+</i>
                      </a>
                  </p>
              </div>
              <!--/子类-->
              <div class="wrapper clearfix">
                  <div class="wrap-box">
                      <ul class="img-list">
                          <li v-for="subcate in item.datas">
                              <router-link v-bind="{to: '/site/goodinfo/'+subcate.artID}">

                                  <div class="img-box">

                                      <img :src="subcate.img_url">

                                  </div>
                                  <div class="info" >
                                      <h3>{{subcate.artTitle}}</h3>
                                      <p class="price">
                                          <b>¥{{subcate.sell_price}}</b>元</p>
                                      <p>
                                          <strong>库存{{subcate.stock_quantity}}</strong>
                                        <span>市场价：
                                        <s>3{{subcate.market_price}}</s>
                                        </span>
                                      </p>
                                  </div>

                              </router-link>
                          </li>



                      </ul>
                  </div>
              </div>
          </div>
      </div>
</template>

<script>
    export default {
        methods: {
            getList() {
                var url = "/site/goods/gettopdata/goods";
                this.$http.get(url).then(res => {
                       this.datalist=res.data.message;

            });
            },
            getCate() {
                var url = "/site/goods/getgoodsgroup";
                this.$http.get(url).then(res => {
                    this.category=res.data.message;
                console.log(this.category);

            });
            },
        },

        data() {
            return {
                 datalist:{},
                 category:[]
            };
        },

        created() {
            this.getList();
            this.getCate();

        }
    };
</script>
<style>
    .el-carousel__container {
        height: 380px;
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 50px;
        margin: 0;
        text-align: center;
    }
</style>
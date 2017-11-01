<template>
    <div>
        <div id="header" class="header">
            <div class="head-top">
                <div class="section">
                    <div class="left-box">
                        <span>vue2.0单页应用</span>
                        <a target="_blank" href="#"></a>
                        <a target="_blank" href="#"></a>
                    </div>
                    <div id="menu" class="right-box">
                        <span v-if="!isvipshow">
                            <router-link to="/site/login">登录</router-link>
                            <a href="/register.html">注册</a>
                        </span>
                        <span v-if="isvipshow">
                             <router-link to="/site/vipcenter">会员中心</router-link>
                            <a  href="javascript:void(0)" @click="logout">退出</a>
                        </span>
                        <strong>|</strong>
                     <a href="/cart.html"><i class="iconfont icon-cart"></i>购物车({{this.$store.state.cateItem}})</a>
                    </div>
                </div>
            </div>
            <div class="head-nav">
                <div class="section">
                    <div id="menu2" class="nav-box menuhd">
                        <ul>
                            <li class="index">
                                <a href="/index.html">
                                    首页
                                </a>
                            </li>
                            <li class="news">
                                <a href="/news.html">
                                    学员问题汇总
                                </a>
                            </li>
                            <li class="photo">
                                <a href="/photo.html">
                                    重难点专区
                                </a>
                            </li>
                            <!--<li class="goods"><a href="">就业阶段</a></li>-->
                            <li class="video">
                                <a href="/video.html">
                                    前端常用功能
                                </a>
                            </li>
                            <li class="down">
                                <a href="/down.html">
                                    资源下载
                                </a>
                            </li>
                            <li>
                                <a target="_blank" href="/admin/index.aspx">
                                    问题提交
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="search-box">
                        <div class="input-box">
                            <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){SiteSearch('/search.html', '#keywords');return false};" placeholder="输入关健字" x-webkit-speech="">
                        </div>
                        <a href="javascript:;" onclick="SiteSearch('/search.html', '#keywords');">
                            <i class="iconfont icon-search"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<style>
    @import url('../../../statics/elementuiCss/index.css');
</style>
<script>
    $(document).ready(function() {
        $("#menu2 li a").wrapInner( '<span class="out"></span>' );
        $("#menu2 li a").each(function() {
            $( '<span class="over">' +  $(this).text() + '</span>' ).appendTo( this );
        });

        $("#menu2 li a").hover(function() {
            $(".out",	this).stop().animate({'top':	'48px'},	300); // move down - hide
            $(".over",	this).stop().animate({'top':	'0px'},		300); // move down - show

        }, function() {
            $(".out",	this).stop().animate({'top':	'0px'},		300); // move up - show
            $(".over",	this).stop().animate({'top':	'-48px'},	300); // move up - hide
        });

    });

    import {getItem} from '../kits/localStorage.js';

    export default{
        data(){
            return {
                isvipshow:false,
                buycount:0
            }
        },
        methods:{
            logout(){
                // 1.0 通知服务器当前用户的session清空
                this.$http.get('/site/account/logout').then(res=>{
                    // 2.0 改变当前的isvipshow的值即可
                    this.isvipshow = false;

                    // 3.0 将localStorage中的值修改成false
                    localStorage.setItem('islogin',false);
                });
            },
            checklogin(){
                var islogin = localStorage.getItem('islogin');
                if(islogin=="true"){
                    this.isvipshow = true;
                }else{
                    this.isvipshow = false;
                }
            }
        },
        mounted(){
            // 监听 changeshow 这个事件
            vm.$on('changeshow',()=>{
                // 1.0 获取到localStorage中的key="islogin"对应的值
                this.checklogin();
            })

            // 当页面重新刷新以后要去获取到localStorage中的这个登录状态，赋值给isvipshow
            this.checklogin();
        }
    }
</script>

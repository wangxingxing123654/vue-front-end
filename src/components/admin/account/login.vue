<template>
   <div>
       <div class="section">
           <div class="location">
               <span>当前位置：</span>
               <a href="/index.html">首页</a> &gt;
               <a href="/login.html">会员登录</a>
           </div>
       </div>
       <div class="section">
           <div class="wrapper">
               <div class="bg-wrap">
                   <div class="nav-tit">
                       <a class="selected" href="javascript:;">账户登录</a>
                       <i>|</i>
                       <a href="/register.html">免费注册</a>
                   </div>

                   <div class="login-box">
                       <div class="input-box">
                           <input id="txtUserName" v-model="form.user_name" type="text" placeholder="用户名/手机/邮箱" maxlength="50">
                       </div>
                       <div class="input-box">
                           <input id="txtPassword" v-model="form.password" type="password" placeholder="输入登录密码" maxlength="16">
                       </div>
                       <div class="btn-box">
                           <input id="btnSubmit" name="btnSubmit" type="button" value="立即登录" @click="submit">
                       </div>
                       <div id="msgtips" class="tip-box"></div>
                       <!--记住上一页网址-->
                   </div>

               </div>
           </div>
       </div>
   </div>
</template>
<script>
    export default {
        data(){
            return {
                form:{
                    user_name:'',
                    password:''
                }
            }
        },
        methods:{
            submit(){
              var path= localStorage.getItem('topath');
              this.$http.post('/site/account/login',this.form).then(res=>{
                  if(res.data.status==0){
                      console.log(1);
                      if(!path){
                          this.$router.push({name:'goodlist'});

                      }else{
                          this.$router.push({name:path});
                      }
                      localStorage.setItem('islogin',true);
                      vm.$emit('changeshow');
                  }
              })

            }
        }

    }
</script>
<template>
    <div class="cover">
        <span  @click="sub">-</span>
        <span>{{count}}</span>
        <span @click="add">+</span>
    </div>
</template>
<script>
  import {getItem,setItem} from '../kits/localStorage.js';
   export default {
       data: function(){
               return {count:1}
           }
       ,
       created(){this.count=this.options.gcount},
       props:['options'],
       methods:{
           sub(){
              this.count--;
              this.send();
           },
           add(){
               this.count++;
               this.send();
           },
           send(){
               this.$emit('sontofa',{id:this.options.gid,count:this.count});
           }

       }
   }
</script>
<style>
    .cover{
        width:120px;
    }
    .cover span{
       cursor: pointer;
       display: inline-block;
       width: 30px;
       padding: 2px;
       text-align: center;
       border: 1px solid rgba(0,0,0,0.3);
   }
</style>
<template>
  <div id="app">
    <Header :seller="seller"></Header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import sellerData from '../public/json/seller';
import Header from "./components/Header";

export default {
  name: "App",
  components: {
    Header,
  },


  created(){
    console.log(sellerData);
    this.seller = Object.assign({}, this.seller, sellerData);
  }
};


</script>

<style scoped>
.tab{
   display: flex;
      width: 100%;
      height: 40px;
      line-height: 40px
}
.tab-item{
   flex: 1;
   text-align: center;
   display: block;
   font-size: 14px;
   color: rgb(77,85,93)
         
}
.active{
   color: rgb(240, 20, 20)
}

</style>

<template>
  <header id="header">
   <div class="content-wrapper">
      <!--商家头像区域-->
      <div class="avatar">
        <img width="64" height="64" v-bind:src="seller.avatar" alt="avatar">
      </div>
      <!--右边区域-->    
      <div class="content">
        <!--商家名-->
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <!--描述和送达时间-->
        <div class="description">
          {{ seller.description }}/{{ seller.deliveryTime }}分钟送达
        </div>
        <!-- 这里使用v-if 的原因是初始化时seller是空的，传给了header组件，所以这里取值就是seller为undefine,所以下面的获取优惠会报错，所以要加一个v-if判断一下-->
        <div v-if="seller.supports" class="support">
          <span class="icon" v-bind:class="classMap[ seller.supports[0].type ]"></span>
          <!-- 获取优惠的第一条数据 -->
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>
      <!--右边的活动个数按钮-->
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{ seller.supports.length }}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <!--底部公告-->
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{ seller.bulletin }}</span>
      <i class="icon-keyboard_arrow_right"></i>      
    </div>
    <!--头部背景图-->
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <!--公告弹层-->
    <transition name="fade">
      <div v-show="detailShow" class="detail" @click="hideDetail">
        <!--这里开始经典的 sticky footer 布局 -->
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
          <!--公告标题-->
          <h1 class="name">{{ seller.name }}</h1>
          <!--使用自定义的star组件,根据score设置星星数量-->
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <!--弹层星星下面的线条和优惠信息的文字-->
          <!--<div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>-->
          <!--改成组件方式-->
          <v-line text="优惠信息"></v-line>
          <!--弹层的优惠信息列表-->
          <ul v-if="seller.supports" class="supports">
            <li class="supports-item" v-for="(item, index) in seller.supports" :key="index">
              <!--根据每一个的索引和下标去取对应的样式-->
              <span class="icon" :class="classMap[seller.supports[index].type]"></span>
              <span class="text">{{ seller.supports[index].description }}</span>
            </li>
          </ul>
          <!--商家公告-->
          <!--<div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>-->
          <!--改成组件方式-->
          <v-line text="商家公告"></v-line>
          <!--商家公告内容-->
          <div class="bulletin">
            <p class="content">{{ seller.bulletin }}</p>
          </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
        <!--sticky footer 布局结束-->
      </div>
    </transition>
  </header>
</template>

<script>
import star from '../Star/index'
export default {
     props: {
      seller: {
        type: Object
      }
    },
    components:{
star:star
    },
 data() {
      return {
        detailShow: false // 控制弹层的显示
      };
    },
    methods: {
      showDetail: function() { // 显示隐公告层
        this.detailShow = true;
      },
      hideDetail: function() { // 隐藏公告层
        this.detailShow = false;
      }
    },
    created() {
      // 这里样式名称的是根据supports的type来的
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
}
</script>

<style  scoped>
#header{
    position: relative ;
    overflow: hidden;
    color: #fff;
    background: rgba(7,17,27,.5);
}
.content-wrapper {
      position: relative;
      padding: 24px 12px 18px 24px;
      font-size: 0;
      }
.avatar {
        display: inline-block;
        vertical-align: top}
img{
    border-radius: 2px
    }
.content{
        display: inline-block;
        margin-left: 16px
        }
 .title {
          margin: 2px 0 8px 0}
.brand{
            display: inline-block;
            width: 30px;
            height: 18px;
            background-size: 30px 18px;
            background-repeat: no-repeat;
            vertical-align: top;
            background-image: url(brand@3x.png);
            }
.name{
            margin-left: 6px;
            font-size: 16px;
            line-height: 18px;
            font-weight: bold}
.description {
          margin-bottom: 10px;
          line-height: 12px;
          font-size: 12px}
.support  .icon{
         
            display: inline-block;
            vertical-align: top;
            width: 12px;
            height: 12px;
            margin-right: 4px;
            background-size: 12px 12px;
            background-repeat: no-repeat
            }
.text{
            line-height: 12px;
            font-size: 10px;
            font-weight: 100}
 .support-count {
        position: absolute;
        right: 12px;
        bottom: 14px;
        padding: 0 8px;
        height: 24px;
        line-height: 24px;
        border-radius: 14px;
        background: rgba(0,0,0,.2);
        text-align: center}
 .support-count .count{
          vertical-align: top;
          line-height: 24px;     
          font-size: 12px;
}
.icon-keyboard_arrow_right{
          vertical-align: top;
          margin-left: 2px;
          line-height: 24px;
          font-size: 12px}
 .bulletin-wrapper{
      position: relative;
      height: 28px;
      line-height: 28px;
      padding: 0 22px 0 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      background: rgba(7,17,27,.2)
}
.bulletin-title{
        display: inline-block;
        vertical-align: top;
        margin-top: 8px;
        width: 22px;
        height: 12px;
        background-size: 22px 12px;
        background-repeat: no-repeat}
.bulletin-text{
        vertical-align: top;
        margin: 0 4px;
        font-size: 10px}
.icon-keyboard_arrow_right{
        position: absolute;
        font-size: 10px;
        right: 12px;
        top: 8px;
}
.background{
      position: absolute;
      top: 0;
      left: 0;                                                                            
      width: 100%;
      height: 100%;
      z-index: -1;
      filter: blur(10px) 
    /* CSS使用filter: blur(10px);实现高斯模糊效果，周边会出现扩展的白边；
解决方案： 对父元素设置overflow: hidden; 隐藏即可。 */
}
.detail {
      position: fixed;
      z-index: 100;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      backdrop-filter: blur(10px) ;
      opacity: 1;
      background: rgba(7,17,27,.8);
      transform: translateX(0)
      }
.fade-enter-active, .fade-leave-active{
        transition: all .5s}
.fade-enter, .fade-leave-active {
        opacity: 0;
        transform: translateX(-100%);
        backgroun: rgba(7, 17, 27, 0) }

    /* 这里是动画效果的地方，还没有写出来*/

      .detail-wrapper {
        width: 100%;
        min-height: 100%}
.detail-main{
          margin-top: 64px;
          padding-bottom: 64px
          }
.detail-main .name{
            line-height: 16px;
            text-align: center;
            font-size: 16px;
            font-weight: 700
            }
/* 这是星星组件的容器的样式 */
.star-wrapper{
            margin-top: 16px;
            padding:2px 0;
            text-align: center
            }
 .supports{
            width: 80%;
            margin: 0 auto
}
.supports-item{
              padding: 0 12px;
              margin-bottom: 12px;
              font-size: 0
}
.icon{
                display: inline-block;
                width: 16px;
                height: 16px;
                vertical-align: top;
                margin-right: 6px;
                background-size: 16px 16px;
                background-repeat: no-repeat;
}
.invoice{
    background-image: url(./invoice_2@2x.png);
}
.decrease{
    background-image: url(./decrease_2@2x.png);
}
.guarantee{
     background-image: url(./guarantee_2@2x.png);
}
.special{
    background-image: url(./special_2@2x.png);
}
.discount{
     background-image: url(./discount_2@2x.png);
}
.detail-close {
        position: relative;
        width: 32px;
        height: 32px;
        margin: -64px auto 0 auto;
        clear: both;
        font-size: 32px}


</style> 
<template>
  <div class="star" :class="starType">
    <!--starType 星星的大小-->
    <!--itemClass 三种状态 全星 半星 空星，每一个状态分别对应一个样式（图标）-->
    <span
      v-for="(itemClass, index) in itemClasses"
      track-by="index"
      class="star-item"
      :class="itemClass"
      :key="index"
    ></span>
  </div>
</template>
<script type="text/ecmascript-6">
const LENGTH = 5; // 星星的总数
const CLS_ON = "on";
const CLS_HALF = "half";
const CLS_OFF = "off";
export default {
  props: {
    size: {
      // 星星的尺寸 有24/36/48 三种尺寸 也可以直接写成  size: ['size']
      type: Number
    },
    score: {
      // 评分
      type: Number
    }
  },
  computed: {
    starType: function() {
      // 简写 starType(){}
      return "star-" + this.size; // 动态的返回star大小的样式
    },
    itemClasses() {
      // 获取判断星星的类型
      let result = [];
      // 例如 4.3 * 2 = 8.6 向下取整就是 9，9 / 2 就是 4.5
      let score = Math.floor(this.score * 2) / 2; // 获取评分的分数
      let hasDecimal = score % 1 !== 0; // 判断是否有小数(半星)
      let integer = Math.floor(score); // 计算一共有多少个全星
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);
      }
      if (hasDecimal) {
        result.push(CLS_HALF);
      }
      // 如果个数达不到5星,则添加空星
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }
      return result;
    }
  }
};
</script>

<style  scope>
.star {
  font-size: 0;
}
.star-item {
  display: inline-block;
  background-repeat: no-repeat;
}
.star-48 .star-item {
  width: 20px;
  height: 20px;
  margin-right: 22px;
  background-size: 20px 20px;
}
.star-48 .star-item:last-child {
  margin-right: 0;
}
.star-48 .star-item .on {
  background-image: url(../../../public/images/star/star48_on@2x.png);
}
.star-48 .star-item .half {
  background-image: url(../../../public/images/star/star48_half@2x.png);
}
.star-48 .star-item .off {
  background-image: url(../../../public/images/star/star48_off@2x.png);
}
.star-36 .star-item {
  width: 15px;
  height: 15px;
  margin-right: 6px;
  background-size: 15px 15px;
}
.star-36 .star-item:last-child {
  margin-right: 0;
}
.star-36 .star-item .on {
  background-image: url(../../../public/images/star/star36_on@2x.png);
}
.star-36 .star-item .half {
  background-image: url(../../../public/images/star/star36_half@2x.png);
}
.star-36 .star-item .off {
  background-image: url(../../../public/images/star/star36_off@2x.png);
}
.star-24 .star-item {
  width: 10px;
  height: 10px;
  margin-right: 3px;
  background-size: 10px 10px;
}
.star-24 .star-item:last-child {
  margin-right: 0;
}
.star-24 .star-item.on {
  background-image: url(../../../public/images/star/star24_on@2x.png);
}
.star-24 .star-item.half {
  background-image: url(../../../public/images/star/star24_half@2x.png);
}
.star-24 .star-item.off {
  background-image: url(../../../public/images/star/star24_off@2x.png);
}
</style>
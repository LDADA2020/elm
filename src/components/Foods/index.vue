<template>
  <div>
    <div class="goods">
      <!--左侧菜单-->
      <div class="menu-wrapper" ref="menuWrapper">
        <!-- 使用ref:绑定要获取的元素-->
        <!--遍历所有商品大分类(菜单)-->
        <ul>
          <!--这里绑定一个对象，根据currentIndex返回当额值设置class，当currentIndex===index 就设置选中样式-->
          <li v-for="(item, index) in goods" class="menu-item"  :key="index"  @click="selectMenu(index,$event)">
            <span class="text border-1px">
              <!--判断类别前面是否有个图标-->
              <span v-show="item.type > 0" class="icon"></span>
              {{ item.name }}
            </span>
          </li>
        </ul>
      </div>
      <!--右侧商品-->
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <!--遍历所有商品 food-list-hook 也是一个变成习惯，表明他是被js选择的元素-->
          <li
            v-for="(item, index) in goods"
            :key="index"
            class="foods-list food-list-hook"
          >
            <h1 class="title">{{ item.name }}</h1>
            <!--右侧商品分割标题（分类）-->
            <ul>
              <li
                @click="selectFood(food, $event)"
                v-for="(food, index) in item.foods"
                :key="index"
                class="food-item border-1px"
              >
                <!--商品的左右两侧-->
                <div class="icon">
                  <!--商品小图标-->
                  <img
                    width="57"
                    height="57"
                    :src="food.icon"
                    alt="food.name"
                  />
                </div>
                <div class="content">
                  <!-- 商品名称和描述-->
                  <h2 class="name">{{ food.name }}</h2>
                  <!--商品名称-->
                  <p class="desc">{{ food.description }}</p>
                  <!--描述-->
                  <div class="extra">
                    <!--销售-->
                    <span class="count">月售{{ food.sellCount }}</span
                    ><span>好评率{{ food.rating }}%</span>
                  </div>
                  <div class="price">
                    <!--价格-->
                    <span class="now">￥{{ food.price }}</span>
                    <span class="old" v-show="food.oldPrice"
                      >￥{{ food.oldPrice }}</span
                    >
                  </div>
                  <!-- 引入增加按钮组件  -->
                  <div class="cartcontrol-wrapper">
                    <!-- 上面遍历的是时候顺便传递food对象  -->
                    <cartbutton @add="addFood" :food="food"></cartbutton>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!--使用购物车组件，并传递配送费和起送费-->
      <!-- ref自定的名字 用来访问子组件 在方法里面使用this.$refs.xxxx 获取 -->
      
      <shopcart :selectFoods="selectFoods" ref="shopcart"></shopcart>
    </div>

    <!-- 使用food组件 ，并传入一个选中的商品 -->
    <!-- ref 用来调用 子组件的方法 show  -->
    <food @add="addFood" :food="selectedFood" ref="foods"></food>
  </div>
</template>

<script>
//这是一个滚动事件的类库，专门用于移动端的滚动事件
import BScroll from 'better-scroll';
import goodData from "../../../public/json/goods";
import cartbutton from '../../components/Cartbutton/cartbutton'
import food from '../../components/Food/food'
// import shopcart from '../shopcart/shopcart'
export default {
  data() {
    return {
      goods: [],
      // scrollY: 0,
      //  listHeight: [], // 用来存放右侧每一个分类/li的商品高度
    };
  },
  props: {seller: { //  seller: ['seller'] 简写形式
        type: Object
      }},
  created() {
    console.log(goodData);
    this.goods = goodData;
     this.$nextTick(() => { // 原始写法 this.$nextTick(function () {});
        // 调用滚动的初始化方法
        this._initScroll();
        this._calculateHeight();
      });

  },
  mounted() {},
  methods: {
    selectMenu(index, event) { // 这里多传递一个事件 ,event 就是click传递的event，当设置 click为 true时，默认就派发了一个点击事件，而pc端本身也有click事件
        if (!event._constructed) {
          return; // 原生的浏览器的event没有 vue的这个 _constructed 属性，所以当没有这个时，直接return。避免在pc端点击时事件执行（触发）2次的效果
        }
        console.log(index);
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index]; // 滚动到响应的元素
        console.log(el);
        this.foodsScroll.scrollToElement(el, 300);
      },
     // 初始化滚动事件
      _initScroll() {
        // 第一个参数是dom对象，第二个参数是options(json格式)
        // vue 中获取指定对象的方式
        // 获取左侧菜单区域
       // BScroll计算dom高度，如果获取不到高度会没有效果，所以上面要调用ick
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true // 一开始的点击事件被bscroll阻止了，设置这个才能点击
        });
        // 获取右侧商品区域
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true, // 这里也要设置为true增加减少按钮才能点击
          probeType:3 // 获取实时滚动的位置，详见bscroll API
        });
        // 监听右侧食品区域滚动的事件
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y)); // 四舍五入得到的y值
          // console.log('当前滚动的Y值：' + this.scrollY);
        });
      },
       _calculateHeight: function () {
        // 获取右侧一个商品的整个li，一个li里面包含了该分类下的所有商品
         let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
         let height = 0;
         this.listHeight.push(height);
         for (let i = 0; i < foodList.length; i++) {
           let item = foodList[i];
           height += item.clientHeight; // 获取每一个li的可视区域的高度
           this.listHeight.push(height); // 这样就得到了每一个商品分类下的所有商品对应的高度
         }
      },
       selectFood(food, event) { // 设置选中的商品以便传递给 food组件
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.foods.show(); // 调用 子组件 food 的show方法
      },
       addFood(target) { // 监听到的组件的事件回调
        this._drop(target);
      },
      _drop: function (target) { // 处理小球动画的方法
        // 体验优化，异步执行下落动画
        // 使用这个接口缓解抛物线小球动画立即执行导致和减按钮两个动画同时执行的卡顿
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target); // 访问子组件的方法
        });
      },
  },
  components: {
    cartbutton,
    food,
    // shopcart
  },
  computed:{
    //这是动态添加样式的一种方法
    //  currentIndex() { // 计算当前右侧的距离，决定决定左侧哪一个分类高亮（选中的意思）
    //     for (let i = 0; i < this.listHeight.length; i++) {
    //       // 这两个高度就是一个li从上到下整个的高度
    //       let height1 = this.listHeight[i]; // 获取当前的上高度
    //       let height2 = this.listHeight[i + 1]; // 获取当前的下高度
    //       // if (this.scrollY > height1 && this.scrollY < height2)  这样子height2会超出listHeight的索引，需要加一个条件
    //       console.log('y:' + this.scrollY);
    //       console.log(height1 + '....' + height2);
    //       if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
    //         return i; // 返回当前索引
    //       }
    //     }
    //     return 0; // 如果什么的都没有就返回 0
    //   },
    selectFoods() { // 循环遍历所有选中的商品
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
  }
};
</script>

<style scoped>
.goods {
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;
}
.menu-wrapper {
  flex: 0 0 80px;
  width: 80px;
  background: #f3f5f7;
}
.menu-item {
  display: table;
  width: 56px;
  height: 54px;
  padding: 0 12px;
  line-height: 14px;
  box-sizing: content-box;
}
 .current {
  position: relative;
  z-index: 10;
  margin-top: -1px;
  background: #fff;
  font-weight: 700;
}
 .text {
  display: table-cell;
  width: 56px;
  vertical-align: middle;
  border: (rgba(7, 17, 27, 0.1));
  font-size: 12px;
}
.menu-item .current .icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  vertical-align: top;
  margin-right: 2px;
  background-size: 16px 16px;
  background-repeat: no-repeat;
}
.foods-wrapper {
  flex: 1;
}
.foods-wrapper .title {
  padding-left: 14px;
  height: 26px;
  line-height: 26px;
  border-left: 2px solid #d9dde1;
  font-size: 12px;
  color: rgb(147, 153, 159);
  background: #f3f5f7;
}
.foods-wrapper .food-item {
  display: flex;
  margin: 18px;
  padding-bottom: 18px;
  border: 1px solid (rgba(7, 17, 27, 0.1));
}
.food-item:last-child {
  margin-bottom: 0;
}
.food-item .icon {
  flex: 0 0 57px;
  margin-right: 10px;
}
.food-item img {
  border-radius: 2px;
}
.food-item .content {
  flex: 1;
}
.food-item .name {
  margin: 2px 0 8px 0;
  height: 14px;
  line-height: 14px;
  font-size: 14px;
  color: rbg(7, 17, 27);
}
.desc,
.extra {
  line-height: 10px;
  font-size: 10px;
  color: rgb(147, 153, 159);
}
.desc {
  margin-bottom: 8px;
  line-height: 12px;
}
.extra,
.count {
  margin-right: 12px;
}
.price {
  font-weight: 700;
  line-height: 24px;
}
.now {
  margin-right: 8px;
  font-size: 14px;
  color: rgb(240, 20, 20);
}
.old {
  text-decoration: line-through;
  font-size: 10px;
  color: rgb(147, 153, 159);
}
</style>

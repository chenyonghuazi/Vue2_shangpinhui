<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
        <div class="sort" v-show="show">
        <div class="all-sort-list2" @click="goSearch">
          <div class="item" 
          v-for="(c1,index) in categoryList" :key="c1.categoryId"
          :class="{cur:currentIndex==index}"
          > 
          <!-- 一级 -->
            <h3 @mouseenter="changeIndex(index)">
              <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
            </h3>
            <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
              <div class="subitem" 
              v-for="(c2) in c1.categoryChild" :key="c2.categoryId"
              >
              <!-- 二级 -->
                <dl class="fore">
                  <dt>
                    <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                  </dt>
                  <dd>
                    <em 
                      v-for="(c3) in c2.categoryChild" :key="c3.categoryId"
                    >
                    <!-- 三级 -->
                      <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                    </em>
                    
                  </dd>
                </dl>
              </div>
            </div>
          </div>

        </div>
        </div>
        </transition>
      </div>
      
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import throttle from 'lodash/throttle';

export default {
  name: "TypeNav",
  //组件挂载完毕：可以向服务器发请求,
  data(){
    return {
      //存储用户鼠标移动到哪一个一级分类身上
      currentIndex:-1,
      show:true,
    }
  },

  mounted(){
    
    //展示或隐藏此组件
    if(this.$route.path != '/home'){
      this.show = false;
    }else{
      this.show = true;
    }
  },

  computed:{

    ...mapState({
      //右侧需要一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
      //注入一个参数state,其实即为大仓库中的数据
      'categoryList':(state)=>{
        console.log(state.home.categoryList)
        return state.home.categoryList
      }
    })
  },
  methods:{
    //鼠标进入修改响应式数据currentIndex
    // changeIndex(index){
    //   this.currentIndex = index
    // },
    changeIndex:throttle(function(index){ //lodash 节流（50毫米间隔以上才会触发一次）
        this.currentIndex = index
    },50),

    //解决展示一级导航的问题 （除了Home组件以外的路由组件，一级导航会隐藏和展现）//鼠标移入一级导航
    enterShow(){
      this.show = true;
    },
    //解决展示一级导航的问题 （除了Home组件以外的路由组件，一级导航会隐藏和展现） //鼠标移出一级导航
    leaveShow(){
      this.changeIndex(-1)

      if(this.$route.path != '/home'){
        this.show = false
      }
    },

    //三级联动跳转 事件委托
    goSearch(event){
      let element = event.target;
      
      //节点有一个属性dataset属性，可以获取节点的自定义属性与属性值
      let {categoryname, category1id, category2id, category3id} = element.dataset
      if(categoryname){

        //开始整合路由跳转的参数
        let location = {name:'search'};
        let query = {categoryName:categoryname};

        if(category1id){ //一级导航联动
          query.category1Id = category1id;

        }else if(category2id){ //二级导航联动
          query.category2Id = category2id;

        }else{ //三级级导航联动
          query.category3Id = category3id;
        }
        if(this.$route.params){
          location.params = this.$route.params;
        }
        location.query = query;
        //路由跳转
        this.$router.push(location)
      }
    }
  }
};
</script>

<style  lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 28px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }

        .cur {
          background-color: skyblue;
        }
      }
    }
    //过度动画开始状态
    .sort-enter {
      height: 0px;
    }
    //过度动画结束状态
    .sort-enter-to {
      height: 461px;
    }
    //定义动画时间、速率
    .sort-enter-active {
      transition: all .5s linear;
    }
  }
}
</style>
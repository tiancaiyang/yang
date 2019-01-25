<template>
  <!-- b2c 公共组件 -->
  <div class="body_common">
    <header-top></header-top>
    <Header></Header>
    <banner :message="num"></banner>
    <div class="body_box">
      <div class="line"></div>
      <div class="top_nav banxin"></div>
      <!-- 子组件显示的区域 -->
      <div class="body_box_content">
        <router-view></router-view>
      </div>
    </div>
    <Footer></Footer>
    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
import banner from '../../components/banner'
export default {
  data () {
    return {
      num:0,
    }
  },
  methods: {

  },
  components:{
    banner
  }
}
</script>

<style lang="scss" scoped>
.body_common {
  .body_box {
    background-color: #f5f5f5;
    // border-bottom: 2px solid #e51818;
    .line{
        border-bottom: 2px solid #e51818;
    }
    .top_nav {
      // height: 20px;

    }
    .body_box_content {
      min-height: 1052px;
    }
  }
}
</style>
